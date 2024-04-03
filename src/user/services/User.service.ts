import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/User.model';
import { CreateUserDto, UpdateUserDto } from 'src/user/entities/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
  }

  async deleteUser(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
  async findByLogin(login: string): Promise<User | null> {
    return this.userModel.findOne({ login }).exec();
  }
    
  
  
}
