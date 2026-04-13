// ═══════════════════════════════════════════════════════════════
//  Servidor de impresión — Brutal Burgers
//  Corre en localhost:3001  |  node servidor-impresion.js
// ═══════════════════════════════════════════════════════════════

// ── CONFIGURACIÓN ─────────────────────────────────────────────
// Pon aquí el nombre exacto de tu impresora térmica.
// Si lo dejas vacío ('') usa la impresora predeterminada de Windows.
// Para ver las impresoras disponibles abre: http://localhost:3001/impresoras
const PRINTER_NAME = '';
// ─────────────────────────────────────────────────────────────

const express = require('express');
const cors    = require('cors');

// Intentar cargar node-printer (módulo nativo Windows)
let printer = null;
try {
  printer = require('@thiagoelg/node-printer');
  const defPrinter = printer.getDefaultPrinterName();
  const usedPrinter = PRINTER_NAME || defPrinter;
  console.log('[PRINT] node-printer cargado OK');
  console.log('[PRINT] Impresora configurada:', usedPrinter);
  if (PRINTER_NAME) console.log('[PRINT] Impresora por defecto del sistema:', defPrinter);
} catch (e) {
  console.warn('[PRINT] node-printer no disponible — usando PowerShell como respaldo');
}

const app  = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));

const PORT       = 3001;
const printedIds = new Set();

// ── Health check ──────────────────────────────────────────────
app.get('/ping', (req, res) => {
  const usedPrinter = PRINTER_NAME || (printer ? printer.getDefaultPrinterName() : 'PowerShell');
  res.json({ ok: true, printer: usedPrinter });
});

// ── Listar impresoras disponibles ─────────────────────────────
app.get('/impresoras', (_req, res) => {
  if (!printer) {
    return res.json({ error: 'node-printer no disponible', impresoras: [] });
  }
  try {
    const lista = printer.getPrinters().map(p => ({
      nombre      : p.name,
      predeterminada: p.isDefault || false,
      estado      : p.status
    }));
    res.json({ impresoras: lista });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Imprimir ticket ───────────────────────────────────────────
app.post('/print', (req, res) => {
  const { pedido } = req.body || {};
  if (!pedido) return res.status(400).json({ error: 'Falta pedido' });

  const oid = pedido.fbId || pedido.id;
  if (printedIds.has(oid)) {
    console.log(`[PRINT] Ya impreso: ${oid}`);
    return res.json({ ok: true, msg: 'Ya impreso' });
  }

  const rawStr = buildTicket(pedido);
  const buf    = Buffer.from(rawStr, 'binary');

  if (printer) {
    // ── Método 1: node-printer (nativo Windows) ───────────────
    try {
      const printerName = PRINTER_NAME || printer.getDefaultPrinterName();
      printer.printDirect({
        data   : buf,
        printer: printerName,
        type   : 'RAW',
        success: (jobId) => console.log(`[PRINT] OK #${pedido.id} job:${jobId}`),
        error  : (err)   => console.error('[PRINT] Error node-printer:', err)
      });
      printedIds.add(oid);
      return res.json({ ok: true });
    } catch (e) {
      console.error('[PRINT] node-printer falló, probando PowerShell:', e.message);
    }
  }

  // ── Método 2: PowerShell RAW (respaldo) ───────────────────
  printViaPowerShell(buf, pedido.id)
    .then(() => {
      printedIds.add(oid);
      res.json({ ok: true });
    })
    .catch(e => {
      console.error('[PRINT] Error PowerShell:', e.message);
      res.status(500).json({ error: e.message });
    });
});

// ── Generar ESC/POS ───────────────────────────────────────────
function buildTicket(pedido) {
  const sep   = '--------------------------------\n';
  const fecha = new Date().toLocaleString('es-ES', { hour12: false });

  const lineas = (pedido.items || pedido.productos || []).map(it => {
    const nombre = it.name  || it;
    const qty    = it.qty   || 1;
    const precio = it.unitPrice != null
      ? `  ${(it.unitPrice * qty).toFixed(2)} EUR` : '';
    const extras = it.extras  && it.extras.length
      ? `\n    + ${it.extras.map(e => e.name).join(', ')}` : '';
    const sinIng = it.removed && it.removed.length
      ? `\n    SIN: ${it.removed.join(', ')}` : '';
    return `  ${qty}x ${nombre}${precio}${extras}${sinIng}\n`;
  });

  return (
    '\x1B\x40' +                               // reset impresora
    '\x1B\x61\x01' +                           // centrar
    '\x1B\x21\x30' +                           // texto grande
    (pedido.type === 'domicilio' ? 'A DOMICILIO\n' : 'RECOGIDA EN LOCAL\n') +
    '\x1B\x21\x00' +                           // texto normal
    sep +
    `Pedido #${(pedido.id || '').replace('BB-', '')}\n` +
    `${fecha}\n` +
    (pedido.name    ? `Cliente: ${pedido.name}\n`  : '') +
    (pedido.phone   ? `Tel: ${pedido.phone}\n`     : '') +
    (pedido.type    ? `Tipo: ${pedido.type}\n`     : '') +
    (pedido.address && pedido.type === 'domicilio'
      ? `Dir: ${pedido.address}\n` : '') +
    (pedido.notes   ? `Notas: ${pedido.notes}\n`   : '') +
    sep +
    '\x1B\x61\x00' +                           // alinear izquierda
    lineas.join('') +
    sep +
    '\x1B\x21\x10' +                           // negrita
    `TOTAL: ${Number(pedido.total || 0).toFixed(2)} EUR\n` +
    '\x1B\x21\x00' +
    sep +
    '\x1B\x61\x01' +
    'Gracias por tu pedido!\n' +
    '\n\n\n\n\n' +
    '\x1D\x56\x41\x00'                         // corte de papel
  );
}

// ── PowerShell: envío RAW via winspool.drv ────────────────────
function printViaPowerShell(buf, id) {
  const { execFile } = require('child_process');
  const fs   = require('fs');
  const path = require('path');
  const os   = require('os');

  const tmpFile    = path.join(os.tmpdir(), `ticket_${id}_${Date.now()}.bin`);
  const tmpEscaped = tmpFile.replace(/\\/g, '\\\\');
  fs.writeFileSync(tmpFile, buf);

  const ps = `
$ErrorActionPreference = 'Stop'
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class RawPrint {
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Ansi)]
  public struct DOCINFO {
    public string pDocName; public string pOutputFile; public string pDataType;
  }
  [DllImport("winspool.drv",CharSet=CharSet.Ansi)]
  public static extern bool OpenPrinter(string n,out IntPtr h,IntPtr d);
  [DllImport("winspool.drv")]
  public static extern bool StartDocPrinter(IntPtr h,int l,ref DOCINFO di);
  [DllImport("winspool.drv")]
  public static extern bool StartPagePrinter(IntPtr h);
  [DllImport("winspool.drv")]
  public static extern bool WritePrinter(IntPtr h,IntPtr b,int c,out int w);
  [DllImport("winspool.drv")]
  public static extern bool EndPagePrinter(IntPtr h);
  [DllImport("winspool.drv")]
  public static extern bool EndDocPrinter(IntPtr h);
  [DllImport("winspool.drv")]
  public static extern bool ClosePrinter(IntPtr h);
}
"@
$pName  = (Get-WmiObject -Query 'SELECT * FROM Win32_Printer WHERE Default=TRUE').Name
$bytes  = [IO.File]::ReadAllBytes("${tmpEscaped}")
$hPtr   = [IntPtr]::Zero
[RawPrint]::OpenPrinter($pName, [ref]$hPtr, [IntPtr]::Zero) | Out-Null
$di = New-Object RawPrint+DOCINFO
$di.pDocName  = "Ticket"
$di.pDataType = "RAW"
[RawPrint]::StartDocPrinter($hPtr, 1, [ref]$di) | Out-Null
[RawPrint]::StartPagePrinter($hPtr) | Out-Null
$gch = [Runtime.InteropServices.GCHandle]::Alloc($bytes, [Runtime.InteropServices.GCHandleType]::Pinned)
$written = 0
[RawPrint]::WritePrinter($hPtr, $gch.AddrOfPinnedObject(), $bytes.Length, [ref]$written) | Out-Null
$gch.Free()
[RawPrint]::EndPagePrinter($hPtr)  | Out-Null
[RawPrint]::EndDocPrinter($hPtr)   | Out-Null
[RawPrint]::ClosePrinter($hPtr)    | Out-Null
Remove-Item "${tmpEscaped}" -Force -ErrorAction SilentlyContinue
`;

  return new Promise((resolve, reject) => {
    execFile('powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', ps],
      { timeout: 15000 },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr || err.message));
        resolve();
      }
    );
  });
}

// ── Arrancar ──────────────────────────────────────────────────
app.listen(PORT, '127.0.0.1', () => {
  console.log('\n========================================');
  console.log('  Servidor de impresion - Brutal Burgers');
  console.log(`  http://localhost:${PORT}`);
  if (printer) console.log(`  Impresora: ${printer.getDefaultPrinterName()}`);
  else         console.log('  Modo: PowerShell (respaldo)');
  console.log('  Deja esta ventana abierta.');
  console.log('========================================\n');
});
