@echo off
echo === React Frontend Setup Script ===
echo.

cd frontend

echo Installing Node.js dependencies...
npm install

echo.
echo Starting React development server...
echo Access the frontend at: http://localhost:3000
npm start

pause
