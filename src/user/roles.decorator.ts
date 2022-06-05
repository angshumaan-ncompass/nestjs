import { SetMetadata } from "@nestjs/common";
import { Role } from "./entities/role.enum";


export const Roles = (...roles: any) => SetMetadata('roles', roles);