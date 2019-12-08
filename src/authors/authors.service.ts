import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(AuthorRepository)
        private authorRepository: AuthorRepository,
    ) {}

    async getAuthors(filterDto: GetAuthorsFilterDto): Promise<Author[]> {
        return this.authorRepository.getAuthors(filterDto);
    }

    async getAuthorById(id: number): Promise<Author> {
        const found = await this.authorRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Author with ID "${id}" not found`);
        }

        return found;
    }

    async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorRepository.createAuthor(createAuthorDto);
    }

    async deleteAuthor(id: number): Promise<void> {
        const result = await this.authorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Author with ID "${id}" not found`);
        }
    }

    async updateAuthorStatus(id: number, status: number): Promise<Author> {
        const author = await this.getAuthorById(id);
        author.status = status;
        await author.save();

        return author;
    }
    // getAllAuthors(): Author[] {
    //     return this.authors;
    // }

    // createAuthor(name: string, phoneNumber: string, address: string, birthDate: string, mailAddress: string): Author {
    //     const author: Author = {
    //         id: uuid(),
    //         name,
    //         phoneNumber,
    //         address,
    //         birthDate,
    //         mailAddress,
    //         status: 1,
    //     };

    //     this.authors.push(author);
    //     return author;
    // }
}
