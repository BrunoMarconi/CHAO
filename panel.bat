@echo off
start /b npx serve . -l 3000
timeout /t 3 /nobreak >nul
start http://localhost:3000
npx serve . -l 3000
