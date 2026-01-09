@echo off
echo === Laravel Backend Setup Script ===
echo.

cd backend

echo Installing PHP dependencies...
composer install

echo.
echo Copying environment file...
if not exist .env (
    copy .env.example .env
    echo Please edit .env file with your database credentials!
) else (
    echo .env file already exists.
)

echo.
echo Generating application key...
php artisan key:generate

echo.
echo Running database migrations...
php artisan migrate

echo.
echo Starting Laravel development server...
echo Access the API at: http://localhost:8000
php artisan serve

pause
