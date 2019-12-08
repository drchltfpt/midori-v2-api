import { Repository, EntityRepository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
    async getAuthors(filterDto: GetAuthorsFilterDto): Promise<Author[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('author');

        if (status) {
            query.andWhere('author.status = :status', { status });
        }

        if (search) {
            query.andWhere('(author.name LIKE :search)', { search: `%${search}%` });
        }

        const authors = await query.getMany();
        return authors;
    }

    async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const { name, phoneNumber, address, birthDate, mailAddress, status } = createAuthorDto;

        const author = new Author();
        author.name = name;
        author.phoneNumber = phoneNumber;
        author.address = address;
        author.birthDate = birthDate;
        author.mailAddress = mailAddress;
        author.status = status;
        await author.save();

        return author;
    }
}