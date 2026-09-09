@echo off
cd /d "%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0launch_utils.ps1"

if errorlevel 1 (
    echo.
    echo Une erreur est survenue.
    pause
)