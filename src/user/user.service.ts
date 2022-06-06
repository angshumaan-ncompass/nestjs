import { BadRequestException, ConflictException, ForbiddenException,  Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from './user.bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const userData = await this.userRepository.findOne({where: {email: createUserDto.email}});
    if(userData && userData.email === createUserDto.email){
      throw new ConflictException("Email already Exists");
    }
    const password = await hashPassword(createUserDto.password);
    createUserDto.password = password;
    const data = await this.userRepository.save(createUserDto);
    delete data.password;
    return{
      message: 'User Added',
      data: data
    }
    
  }

  async findAll() {
    const userData = await this.userRepository.find();
    userData.map(data => delete data.password)
    return {
      message: 'Users Retrived',
      data: userData
    }
  }

  async findOne(id: number) {
    const userData = await this.userRepository.findOne({where:{id: id}});
    if(!userData){
      throw new NotFoundException("User Not Found")
    }
    delete userData.password;
    return {
      message: 'User Retrived',
      data: userData
    };
  }

  async findOneByEmail(email: string): Promise<User | undefined>{
    return await this.userRepository.findOne({where:{email : email}})
  }


  async update(user: Record<string, any> ,updateUserDto: UpdateUserDto) {
    if(!updateUserDto.email && !updateUserDto.id && !updateUserDto.password && !updateUserDto.isAdmin){
      throw new BadRequestException("No data to update")
    }
    let password;
    if(updateUserDto.password){
      password = await hashPassword(updateUserDto.password);
    }

    if(user.isAdmin && updateUserDto.id){
      const userData = await this.userRepository.findOne({where: {id: updateUserDto.id}});
      userData.email = updateUserDto.email;
      userData.password = password;
      userData.isAdmin = updateUserDto.isAdmin;
      const data = await this.userRepository.save(userData);
      delete data.password;
      return{
        message: 'User Updated',
        data: data,
      }
    }

    if(user.isAdmin && !updateUserDto.id){
      const userData = await this.userRepository.findOne({where: {id: user.id}});
      userData.email = updateUserDto.email;
      userData.password =password;
      userData.isAdmin = updateUserDto.isAdmin;
      const data = await this.userRepository.save(userData);
      delete data.password;
      return{
        message: 'User Updated',
        data: data,
      }
    }

    if(!user.isAdmin && !updateUserDto.id){
      const userData = await this.userRepository.findOne({where: {id: user.id}});
      userData.email = updateUserDto.email;
      userData.password = password;
      if(updateUserDto.isAdmin){
        throw new ForbiddenException('Only admin can update isAdmin field');
      }
      const data = await this.userRepository.save(userData);
      delete data.password;
      return{
        message: 'User Updated',
        data: data,
      }
    }
    if(!user.isAdmin && updateUserDto.id){
      throw new ForbiddenException("Only admin can update another user data")
    }
  }

  async delete (deleteUserDto: DeleteUserDto, user: Record<string, any>){
    if(deleteUserDto.id && user.isAdmin){
      await this.userRepository.delete(deleteUserDto.id);
      return{
        message: "User deleted",
        data:deleteUserDto.id
      }
    }

    if(!user.isAdmin && deleteUserDto.id){
      throw new UnauthorizedException("Only admin can delete another user")
    }

    if(!deleteUserDto.id){
      await this.userRepository.delete(user.id);
      return{
        message: "User deleted",
        data:{
          id: user.id
        }
      }
    }

    
  }

}
