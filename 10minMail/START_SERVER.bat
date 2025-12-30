@echo off
echo ========================================
echo   10 Minute Mail - Starting Server
echo ========================================
echo.

REM Check for Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Python server...
    echo.
    python server.py
    goto :end
)

REM Check for Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Node.js server...
    echo.
    node server.js
    goto :end
)

REM If neither is found
echo ERROR: Neither Python nor Node.js is installed.
echo.
echo Please install one of the following:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
echo Or open index.html directly in your browser (may have CORS limitations)
echo.
pause
goto :end

:end
