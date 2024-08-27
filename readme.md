# Challenge para Phinx

```bash
docker-compose up

# Genera una nueva migración
npx typeorm migration:generate -n MigrationName

# Ejecuta las migraciones
npx typeorm migration:run
```