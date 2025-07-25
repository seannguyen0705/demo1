import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  ssl: configService.get('DB_SSL') === 'true' ? true : false,
  logging: false,
  synchronize: false,
  entities: ['src/api/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
