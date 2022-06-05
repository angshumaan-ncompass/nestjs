import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    isAdmin: boolean;
}