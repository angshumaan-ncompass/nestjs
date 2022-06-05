import { Injectable, HttpStatus, HttpException, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { encodedPassword } from './users.bycrypt';
import { UpdateUserDto } from './dto/update-user.dto';





@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isUserExists = await this.usersRepository.findOne({
      where: { email }
    });
    if (isUserExists) {
      throw new BadRequestException("User already exists")
    }
    const password = await encodedPassword(createUserDto.password)
    const user = await this.usersRepository.save({ ...createUserDto, password })
    delete user.password;
    return user;
  }

  async showAll() {
    return await this.usersRepository.find();
  }


  async read(session: Record<string, any>) {

    const user = await this.usersRepository.findOne({
      where: {
        id: session.passport.user.id
      }
    })
    if (!user) {
      throw new NotFoundException("id not found")
    }
    return user;
  }

  async update(id: number, isAdmin: boolean, updateUserDto: UpdateUserDto) {
    const userData = await this.usersRepository.findOne({ where: { id: id } });
    userData.email = updateUserDto.email;
    if (isAdmin) {
      userData.isAdmin = updateUserDto.isAdmin;
    } else {
      throw new ForbiddenException('Only Admin can updated isAdmin field')
    }
    userData.password = updateUserDto.password;
    const data = await this.usersRepository.save(userData);
    delete data.password;
    return {
      message: 'User Updated',
      data: data,
    }
  }

  async delete(session: Record<string, any>) {
    console.log(session.passport);

    const user = await this.usersRepository.delete({

      id: session.passport.user.id

    })
    if (!user) {
      throw new NotFoundException("Id not found")
    }
    return { deleted: true };
  }


  async findOne(email: string) {

    return await this.usersRepository.findOne({
      where: {
        email
      }
    })
  }


  findUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email
      }
    })
  }

  findUserById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id
      }
    })
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email: email } })
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // async signin({ email, password }: SigninParams) {
  //   const user = await this.usersRepository.findOne({
  //     where: {
  //       email
  //     }
  //   })
  //   if (!user) {
  //     throw new ForbiddenException("Invalid credentials")
  //   }

  //   const hashedPassword = user.password;

  //   const isValidPassword = await bcrypt.compare(password, hashedPassword)



  //   if (!isValidPassword) {
  //     throw new HttpException("Invalid credentials", 404);
  //   }

  //   const token = await this.generateJWT(user.name, user.id)
  //   return { "token": token };
  // }


  // private async generateJWT(name: string, id: number) {
  //   return await jwt.sign({
  //     name,
  //     id,
  //   }, process.env.JWT_SECRET, {
  //     expiresIn: 3600000
  //   })
  // }


  // async read(id: number) {

  //     const user = await this.usersRepository.findOne({
  //         where: {
  //             id
  //         }
  //     })
  //     if (!user) {
  //         throw new NotFoundException("id not found")
  //     }
  //     return await this.usersRepository.findOne({ where: { id: id } });
  // }





}