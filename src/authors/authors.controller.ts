import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe, Delete, Patch, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Get()
    getAuthors(@Query(ValidationPipe) filterDto: GetAuthorsFilterDto) {
        return this.authorsService.getAuthors(filterDto);
    }

    @Get('/:id')
    getAuthorById(@Param('id', ParseIntPipe) id: number): Promise<Author> {
        return this.authorsService.getAuthorById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorsService.createAuthor(createAuthorDto);
    }

    @Delete('/:id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.authorsService.deleteAuthor(id);
    }

    @Patch('/:id/status')
    updateAuthorStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ParseIntPipe) status: number,
    ): Promise<Author> {
        return this.authorsService.updateAuthorStatus(id, status);
    }
}
