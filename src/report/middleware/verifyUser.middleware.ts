import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class VerifyUserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction ){
        const user: any = req.user;
        if(!user){
            throw new UnauthorizedException("Sign in First")
        }
        next()
    }
}