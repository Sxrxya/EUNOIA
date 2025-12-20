@echo off
REM Antigravity Error Fix Script (CMD version)
REM Run this if PowerShell has execution policy issues

echo ========================================
echo   Antigravity - Error Fix Script (CMD)
echo ========================================
echo.

REM Navigate to frontend
cd /d C:\Users\welcome\Downloads\antigravity\frontend
if errorlevel 1 (
    echo [ERROR] Could not navigate to frontend directory
    pause
    exit /b 1
)

echo [OK] In directory: %CD%
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found
    echo Please install from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
echo This may take 2-5 minutes...
echo.

npm install
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

REM Verify
echo Verifying installation...
npm list --depth=0

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo All errors should now be resolved.
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
