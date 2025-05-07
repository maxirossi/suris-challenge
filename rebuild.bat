@echo off
SETLOCAL

REM 
cd ms-palindrome
IF NOT EXIST "node_modules\.prisma\client" (
    echo ⚠ Prisma client not found. Running prisma generate...
    npx prisma generate
    IF %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to generate Prisma client. Exiting...
        EXIT /B 1
    )
    echo ✅ Prisma client generated successfully.
) ELSE (
    echo ✅ Prisma client already exists.
)

cd ..

echo 🧹 Cleaning Docker environment...
docker-compose down --volumes --remove-orphans
docker system prune -af -f
docker volume prune -f

echo 🚀 Building and starting containers...
docker-compose up --build

ENDLOCAL
