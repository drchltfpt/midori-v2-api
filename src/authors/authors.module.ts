import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    AuthModule,
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
