import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './entities/role.enum';
import { Roles } from './roles.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { DeleteUserDto } from './dto/delete-user-dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthenticatedGuard)
  create(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Get('/users')
  findAll( @Session() session: Record<string, any>) {
    return this.userService.findAll();
  }

  @Get('/finduser/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/update')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Session() session: Record<string, any>) {
    const user = session.passport.user;
    return this.userService.update(user,updateUserDto);
  }

  @Delete('/delete')
  @UseGuards(AuthenticatedGuard)
  delete(@Body() deleteUserDto: DeleteUserDto, @Session() session: Record<string, any>){
    const user = session.passport.user;
    return this.userService.delete(deleteUserDto, user)
  }


}
