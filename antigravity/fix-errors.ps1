# Antigravity Error Fix Script
# Run this in PowerShell as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Antigravity - Error Fix Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "[WARNING] Not running as Administrator" -ForegroundColor Yellow
    Write-Host "Some operations may fail. Please run PowerShell as Administrator." -ForegroundColor Yellow
    Write-Host ""
}

# Set execution policy for this session
Write-Host "Setting execution policy..." -ForegroundColor Yellow
try {
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    Write-Host "[OK] Execution policy set" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Failed to set execution policy: $_" -ForegroundColor Red
}

Write-Host ""

# Navigate to frontend directory
$frontendPath = "C:\Users\welcome\Downloads\antigravity\frontend"
if (Test-Path $frontendPath) {
    Set-Location -Path $frontendPath
    Write-Host "[OK] Navigated to: $frontendPath" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Frontend directory not found: $frontendPath" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js version: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Node.js not found. Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "[OK] npm version: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take 2-5 minutes..." -ForegroundColor Cyan
Write-Host ""

try {
    npm install
    Write-Host ""
    Write-Host "[OK] Dependencies installed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Failed to install dependencies: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running manually:" -ForegroundColor Yellow
    Write-Host "  cd $frontendPath" -ForegroundColor White
    Write-Host "  npm install" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "Verifying installation..." -ForegroundColor Yellow
npm list --depth=0

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "All errors should now be resolved." -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
