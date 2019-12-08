import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetAuthorsFilterDto {
    @IsOptional()
    status: number;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}