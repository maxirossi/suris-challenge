#!/bin/bash

# Navegamos al directorio del microservicio
cd ./ms-palindrome || exit 1

# Verificamos si el cliente de Prisma está generado
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "⚠ Prisma client not found. Running prisma generate..."
  npx prisma generate
  if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client. Exiting..."
    exit 1
  fi
  echo "✅ Prisma client generated successfully."
else
  echo "✅ Prisma client already exists."
fi

# Volvemos al root del proyecto
cd ..

# Limpiamos contenedores, imágenes, volúmenes y redes huérfanas
echo "🧹 Cleaning Docker environment..."
docker-compose down --volumes --remove-orphans
docker system prune -af
docker volume prune -f

# Levantamos el proyecto
echo "🚀 Building and starting containers..."
docker-compose up --build
