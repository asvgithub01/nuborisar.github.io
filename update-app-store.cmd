@echo off
setlocal

cd /d "%~dp0"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0app-store\tools\update-app-store.ps1" -Publish %*
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
  echo.
  echo La actualizacion del App Store ha fallado con codigo %EXIT_CODE%.
)

exit /b %EXIT_CODE%
