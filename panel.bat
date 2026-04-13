@echo off
cd /d "%~dp0"

:: Arrancar servidor de impresion en segundo plano
start "Servidor Impresion Brutal Burgers" /min node servidor-impresion.js

:: Esperar un momento y abrir el navegador
timeout /t 2 /nobreak >nul
start "" http://localhost:3000

:: Arrancar servidor web (deja esta ventana abierta)
npx serve .
