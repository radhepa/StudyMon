@echo off
title C-MON
cd /d "%~dp0"
set PORT=8777

echo.
echo   ================================
echo    C-MON  -  a C study RPG
echo   ================================
echo.
echo   Starting on http://localhost:%PORT%
echo   Leave this window open while you play.
echo   Close it when you are done.
echo.

where python >nul 2>nul
if %errorlevel%==0 goto :python

where node >nul 2>nul
if %errorlevel%==0 goto :node

echo   Neither Python nor Node was found on this PC.
echo   You can still play by double-clicking index.html directly,
echo   though saving is more reliable through this launcher.
echo.
pause
start "" "index.html"
goto :eof

:python
start "" "http://localhost:%PORT%/"
python -m http.server %PORT% --bind 127.0.0.1
goto :eof

:node
start "" "http://localhost:%PORT%/"
node "tools\serve.js" %PORT%
goto :eof
