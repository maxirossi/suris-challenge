# 🧠 Palindrome Challenge

Este proyecto consiste en una aplicación fullstack para verificar si una palabra o frase es un **palíndromo**, almacenarla en una base de datos y mostrar un historial reciente.

---

## 🚀 Requisitos

- Tener **Docker** y **Docker Compose** instalados en el sistema.

---

## ⚙️ Instalación y ejecución

### 🔧 1. Dar permisos a los scripts (Linux)

```bash
sudo chmod +x scripts/linux/rebuild.sh
sudo chmod +x scripts/linux/migrations.sh
```

### 🛠️ 2. Ejecutar el build y entorno completo

```bash
scripts/linux/rebuild.sh     # Limpia, compila y levanta los containers
scripts/linux/migrations.sh  # Aplica migraciones y ejecuta el seeder
```

---

### 🪟 Windows

En `scripts/windows/` tenés disponibles los siguientes scripts:

```bat
rebuild.bat       :: Compila y levanta los contenedores
migrations.bat    :: Corre migraciones y seeder
```

Ejecutalos haciendo doble clic o desde consola.

---

### 🐳 Alternativa manual (opcional)

Si preferís hacerlo manualmente:

```bash
docker-compose up --build
```

Luego ejecutá las migraciones con:

```bash
docker exec -it ms_palindrome npx prisma migrate dev --name init --skip-seed
docker exec -it ms_palindrome npx ts-node prisma/seed.ts
```

---

## 📡 Endpoints disponibles

### 🔁 Health Check

```bash
curl http://localhost:3000/health
```

---

### 📘 Documentación Swagger

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

### 👤 Obtener usuarios

```bash
curl -s http://localhost:3000/v1/users
```

---

### 🧠 Obtener palíndromos

```bash
curl -s http://localhost:3000/v1/palidrome
```

---

### 📝 Crear palíndromo

```bash
curl -X POST http://localhost:3000/v1/palidrome \
  -H "Content-Type: application/json" \
  -d '{"word": "reconocer"}'
```

---

### 🕓 Obtener últimos palíndromos

```bash
curl -X GET "http://localhost:3000/v1/palidrome/latest?limit=3" \
  -H "Content-Type: application/json"
```

---

## ✅ Orden recomendado para ejecutar

1. **Build del proyecto**  
   - Linux: `scripts/linux/rebuild.sh`  
   - Windows: `scripts/windows/rebuild.bat`

2. **Migraciones y datos iniciales**  
   - Linux: `scripts/linux/migrations.sh`  
   - Windows: `scripts/windows/migrations.bat`

3. Accedé a `http://localhost:3000/api-docs` o probá con los endpoints vía `curl`.

---

## 👨‍💻 Autor

- Maximiliano Rossi
