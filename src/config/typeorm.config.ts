import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Author } from '../authors/author.entity';
import * as config from 'config';
import { User } from '../auth/user.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_NAME || dbConfig.database,
  entities: [Author, User],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}