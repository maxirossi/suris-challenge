# palandrome-challenge

Debes tener instalado previamente Docker y Docker Composer en 
el equipo a ejecutar el test.
Luego, ejecutar el comando

En linux
dar permisos a rebuild.sh y migration.sh
sudo chmod +x rebuild.sh
sudo chmod +x migrations.sh

y luego

./rebuild.sh (hacer el build + clean)
./migrations.sh (correr migration + seeder)

para windows, tenemos 
rebuild.bat y migrations.bat
-------------------------------------
-------------------------------------

docker-compose up --build

sobre el root del proyecto. Esto descargará los containers necesarios
para poder ejecutar el mismo.

Una vez levantado los containers, podemos probar el microservicio "ms-palindrome" con este curl

-------------------------------------
-------------------------------------

Endpoints =>

Health

curl http://localhost:3000/health

Swagger => http://localhost:3000/api-docs

Get Users => curl -s http://localhost:3000/v1/users | jq


-------------------------------------
-------------------------------------

