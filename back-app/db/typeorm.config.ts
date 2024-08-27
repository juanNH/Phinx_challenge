import { DataSource } from "typeorm";

export default new DataSource({
    type: 'sqlite',
    database: './db/database.db',
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
    migrationsTableName:'migrations',
    synchronize: true,
  });