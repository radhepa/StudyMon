@echo off
rem Opens the Pokemon Kingdom sandbox (kingdom-sandbox.html) on its own port.
rem "Kingdom Sandbox.exe" does the same without a console window. Rebuild it with:
rem   C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /nologo /target:winexe /win32icon:assets\ui\studymon.ico /out:"Kingdom Sandbox.exe" tools\SandboxLauncher.cs
title Kingdom Sandbox
cd /d "%~dp0"
set PORT=8796

echo.
echo   ================================
echo    StudyMon  -  Kingdom Sandbox
echo   ================================
echo.
echo   Starting on http://localhost:%PORT%/kingdom-sandbox.html
echo   Leave this window open while you test.
echo.

where python >nul 2>nul
if %errorlevel%==0 goto :python

where node >nul 2>nul
if %errorlevel%==0 goto :node

echo   Neither Python nor Node was found on this PC.
pause
goto :eof

:python
start "" "http://localhost:%PORT%/kingdom-sandbox.html"
python "tools\serve.py" %PORT%
goto :eof

:node
start "" "http://localhost:%PORT%/kingdom-sandbox.html"
node "tools\serve.js" %PORT%
goto :eof
