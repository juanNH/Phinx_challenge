# Challenge para Phinx

## Correr backend

Ante todo cualquier duda estoy atento en mi mail: juannicolash01@gmail.com

Usar la rama master

La app corre en el puerto 3000


```bash
# ingresa al repo backend
cd .\back-app\
# Genera base de datos
touch db\database.db

# Instala dependencias
npm i

# Ejecuta las migraciones
npm run migration:run

#Ejecuta la app en modo desarrollo
npm run start:dev
```
### Endpoints

* [Swagger](http://localhost:3000/api/) de la app backend


## Correr frontend

La app corre en el puerto 5173


```bash
# ingresa al repo backend
cd .\front-app\  

# Instala dependencias
npm i

#Ejecuta la app en modo desarrollo
npm run dev
```

### Endpoints

* [Home](http://localhost:5173/) pantalla home de la app
* [Battle](http://localhost:5173/battle) pantalla de batalla
