@echo off
echo ============================================
echo   Instalador - Brutal Burgers
echo ============================================
echo.

:: ── Instalar dependencias Node.js ────────────────────────────
echo [1/3] Instalando dependencias...
cd /d "%~dp0"
call "%~dp0npm.cmd" install
if %errorlevel% neq 0 (
  echo ERROR: npm install fallo.
  pause
  exit /b 1
)
echo OK
echo.

:: ── Crear acceso directo en Inicio para arranque automatico ──
echo [2/3] Configurando arranque automatico...
set STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
set SCRIPT_DIR=%~dp0

(
echo @echo off
echo cd /d "%SCRIPT_DIR%"
echo start "Servidor Impresion Brutal Burgers" /min "%~dp0node.exe" servidor-impresion.js
) > "%STARTUP%\brutal-burgers-impresion.bat"

echo OK
echo.

:: ── Arrancar el servidor ahora ────────────────────────────────
echo [3/3] Arrancando servidor de impresion...
start "Servidor Impresion Brutal Burgers" /min node "%SCRIPT_DIR%servidor-impresion.js"
echo OK
echo.

echo ============================================
echo   Instalacion completada
echo ============================================
echo.
echo  - El servidor de impresion arrancara solo
echo    cada vez que enciendas el ordenador.
echo.
echo  - Si ves una ventana minimizada en la barra
echo    de tareas, es el servidor. No la cierres.
echo.
echo  - Ya no hace falta QZ Tray para imprimir.
echo    Puedes cerrarlo si quieres.
echo.
pause
