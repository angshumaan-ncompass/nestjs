import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, isEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    id?: number;
    
    @IsEmail()
    email?: string;

    @MinLength(8)
    password?: string;

    @IsBoolean()
    isAdmin?: boolean;
}
