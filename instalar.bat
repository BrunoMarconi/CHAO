@echo off
if not exist "%APPDATA%\qz" mkdir "%APPDATA%\qz"
echo http://localhost:3000> "%APPDATA%\qz\allowed.dat"
echo.
echo allowed.dat creado correctamente en %APPDATA%\qz\
echo.
echo Ahora reinicia QZ Tray si estaba abierto.
pause
