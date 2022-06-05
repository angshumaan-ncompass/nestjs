
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./entities/role.enum";
import { UserService } from "./user.service";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService, private userService: UserService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRole = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRole) {
            return true;
        }
        const ctx = context.switchToHttp().getRequest();
        const userData = ctx.user;

        if (requiredRole === userData.isAdmin) {
            return true
        } else {
            return false
        }

        // const token = ctx.headers.authorization.split(' ')[1];
        // const decodedToken: any = await this.jwtService.decode(token);

        // const userData = await this.userService.findOneByEmail(decodedToken.email)
        // if(requiredRole === userData.isAdmin){
        //     return true;
        // }else{
        //     return false;
        // }

    }
}