:: launch_game.bat
@echo off
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0launch_game.ps1"

if errorlevel 1 (
    echo.
    echo Une erreur est survenue.
    pause
)