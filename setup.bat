@echo off
title POTRimence - Setup Script
color 0A

echo.
echo ============================================
echo   POTRimence - Full Setup Script
echo   Portaldot Blockchain Explorer
echo ============================================
echo.

:: Step 1: Install npm dependencies
echo [1/4] Installing npm dependencies...
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed! Make sure Node.js is installed.
    pause
    exit /b 1
)
echo.
echo [OK] Dependencies installed successfully!
echo.

:: Step 2: Check if WSL is available
echo [2/4] Checking WSL status...
wsl --list --quiet >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] WSL is NOT installed.
    echo To install WSL, run this command in an ADMIN PowerShell:
    echo.
    echo     wsl --install
    echo.
    echo Then restart your computer and re-run this script.
    echo.
    echo In the meantime, you can connect to MAINNET instead.
    echo.
    goto :skip_node
) else (
    echo [OK] WSL is available!
)

:: Step 3: Download and setup Portaldot node in WSL
echo.
echo [3/4] Downloading Portaldot dev node in WSL...
echo.
wsl bash -c "cd ~ && if [ ! -d portaldot-testnet-ubuntu ]; then echo 'Downloading Portaldot testnet node...' && wget -q https://github.com/portaldotVolunteer/Portaldot-node/raw/main/portaldot-testnet-ubuntu.tar.gz && tar -xzf portaldot-testnet-ubuntu.tar.gz && chmod 755 portaldot-testnet-ubuntu/portaldot_dev && echo '[OK] Node downloaded and extracted!' && rm -f portaldot-testnet-ubuntu.tar.gz; else echo '[OK] Node already exists, skipping download.'; fi"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] Failed to download node. You may need to download manually.
    echo See: https://portaldot-dev.readthedocs.io/en/latest/chain-info.html
    goto :skip_node
)

echo.
echo [OK] Portaldot dev node is ready!
echo.

:skip_node

:: Step 4: Summary
echo.
echo ============================================
echo   SETUP COMPLETE!
echo ============================================
echo.
echo   Next steps:
echo.
echo   1. Start Portaldot node (in a separate terminal):
echo      wsl bash -c "cd ~/portaldot-testnet-ubuntu && ./portaldot_dev --dev --alice"
echo.
echo   2. Start the app:
echo      npm run dev
echo.
echo   3. Open browser:
echo      http://localhost:3000
echo.
echo   4. Test with Alice address:
echo      5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
echo.
echo ============================================
echo.
pause
