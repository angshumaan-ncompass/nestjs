import{ IsEmail, MinLength, IsNotEmpty} from "class-validator";
export class CreateUserDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    isAdmin: boolean;
}
