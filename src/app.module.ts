import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthorsModule,
    AuthModule,
  ],
})
export class AppModule {}
