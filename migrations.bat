@echo off
echo 🔄 Ejecutando migraciones dentro del contenedor ms_palindrome...

docker exec -it ms_palindrome npx prisma migrate dev --name init --skip-seed

echo ✅ Migraciones ejecutadas.

echo 🌱 Ejecutando seed.ts dentro del contenedor...

docker exec -it ms_palindrome npx ts-node prisma/seed.ts

echo ✅ Seeder ejecutado.
pause
