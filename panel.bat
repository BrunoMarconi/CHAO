@echo off
cd /d "%~dp0"

:: Usar node.exe local si existe, si no usar el del sistema
if exist "%~dp0node.exe" (
  set NODE="%~dp0node.exe"
) else (
  set NODE=node
)

:: Arrancar servidor de impresion en segundo plano
start "Servidor Impresion Brutal Burgers" /min %NODE% servidor-impresion.js

:: Esperar un momento y abrir el panel directamente
timeout /t 2 /nobreak >nul
start "" "%~dp0index.html"
