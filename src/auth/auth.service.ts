import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bycrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.findOneByEmail(email);
        if(user){
            const passwordMatch = await bycrypt.compare(password, user.password);
            if(user && passwordMatch){
                const {password, ...rest} = user;
                return rest;
            }else{
                throw new UnauthorizedException("Check your password")
            }

        }else{
            throw new NotFoundException('User not found! Check your email')
        }

    }

    async login(user: any){
        const payload = {email: user.email, id: user.id};
        return{
            message: 'SignedIn',
            access_token: this.jwtService.sign(payload),
            data: payload
        }
    }
}
