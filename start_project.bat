@echo off
cd /d "e:\Сайт Рико"
echo Installing dependencies...
call npm install
echo Starting project...
npm run dev
pause
