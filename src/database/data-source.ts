import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://Mariachibd:Mariachibd2023@localhost:5432/diarybdMariachi',
  synchronize: false,
  logging: false,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/mysql/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

