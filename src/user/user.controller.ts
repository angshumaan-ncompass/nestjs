import {
  Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, BadRequestException, SetMetadata, UseGuards, Session, Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.enum';
import { Roles } from './roles.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';


@Controller('user')
export class UserController {
  constructor(private usersService: UserService) { }

  @Get('/getUsers')
  async showAllUsers() {

    const users = await this.usersService.showAll();
    if (!users) {
      throw new BadRequestException("Users nor found")
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };
  }

  @Post('/create')
  async createUsers(@Body() createUserDto: CreateUserDto,) {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new BadRequestException
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user
    };
  }



  // @UseGuards(JwtAuthGuard)
  @Get('/getUserDetail')
  async readUser(@Session() session: Record<string, any>) {
    // console.log(req);

    const data = await this.usersService.read(session);
    if (!data) {
      throw new BadRequestException
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch('/update/:id')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Session() session: Record<string, any>) {
    const isAdmin = session.passport.user.isAdmin;
    return this.usersService.update(+id, isAdmin, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete('/delete')
  async deleteUser(@Session() session: Record<string, any>) {
    await this.usersService.delete(session);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }



  // @Post('/login')
  // signin(@Body() body: SigninDto) {
  //     return this.usersService.signin(body);
  // }
}

