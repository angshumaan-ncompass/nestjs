import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";




@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {
        super();
    }
    serializeUser(user: User, done: (err, user: User) => void): any {
        console.log("serializeUser");
        done(null, user)
    }
    async deserializeUser(user: User, done: (err, user: User) => void) {
        console.log("deserializeUser");

        const userData = await this.userService.findUserById(user.id);
        return userData ? done(null, user) : done(null, null)

    }
}