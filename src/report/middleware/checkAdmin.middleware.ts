import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class CheckAdminMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction ){
        const user: any =req.user;
        if(!user.isAdmin){
            throw new UnauthorizedException("You are not admin")
        }
        next()
    }
}