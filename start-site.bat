@echo off
title X6 website - localhost:3000
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed. Download the LTS version from https://nodejs.org
  echo  then double-click this file again.
  echo.
  pause
  exit /b 1
)

echo Checking packages (installs anything new; quick when up to date)...
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo  npm install failed. Check your internet connection and try again.
  pause
  exit /b 1
)

rem Clear the dev cache so stale builds don't linger.
if exist .next rmdir /s /q .next

echo.
echo  Starting the X6 site. Open http://localhost:3000 once it says "Ready".
echo  Keep this window open; closing it stops the site.
echo.
start "" http://localhost:3000
call npm run dev
pause
