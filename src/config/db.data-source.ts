import { DataSource, DataSourceOptions } from 'typeorm';

export const options = {
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'skyquest',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
} as DataSourceOptions;

export default new DataSource(options);
