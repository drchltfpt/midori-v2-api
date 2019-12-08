import { IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateAuthorDto {
    @IsNotEmpty()
    name: string;

    phoneNumber: string;

    address: string;

    @IsNotEmpty()
    birthDate: string;

    mailAddress: string;

    @IsNotEmpty()
    status: number;
}