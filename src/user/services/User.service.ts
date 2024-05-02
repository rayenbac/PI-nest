import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/User.model';
import { CreateUserDto, UpdateUserDto } from 'src/user/entities/user.dto';
import { CompanyService } from 'src/company/services/company.service';
import { Company } from 'src/company/entities/company.entity';
import { CreateCompanyDto } from 'src/company/entities/company.dto';
import * as multer from 'multer';
import * as fs from 'fs';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    private readonly companyService: CompanyService,
  private readonly  authService: AuthService) {}

  async createUser(createUserDto: CreateUserDto, companyId: string): Promise<User> {
  

    const userWithCompany = new this.userModel({
      ...createUserDto,
      company: companyId,
    });

    return userWithCompany.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('company').exec();
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
  // async uploadPicture(userId: string, file: multer.Multer.File): Promise<void> {
  //   const user = await this.userModel.findById(userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Save the file to a directory on server
  //   // configure multer to save files to the desired directory
  //   const filePath = `uploads/${userId}_${file.originalname}`;
  //   await fs.promises.writeFile(filePath, file.buffer);

  //   // Update the user's picture field with the file path
  //   user.picture = filePath;
  //   await user.save();
  // }
  async findAllUsersByCompany(companyId: string): Promise<User[]> {
    return this.userModel.find({ company: companyId }).populate('company').exec();
  }
  async deactivateUser(userId: string): Promise<User> {
    const deactivatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).exec();

    // Send email notification after deactivation
    await this.authService.sendDeactivationEmail(deactivatedUser.login);

    return deactivatedUser;
  }
  async activateUser(userId: string): Promise<User> {
    const activatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    ).exec();

    await this.authService.sendActivationEmail(activatedUser.login);

    return activatedUser;
  }



  async sendUserEmail(email: string, password: string): Promise<void> {
    try {
      // Call your mail service to send the activation email
      await this.authService.sendEmail(email, password);
    } catch (error) {
      console.error('Error sending activation email:', error);
      // Handle errors here if necessary
      throw new Error('Failed to send activation email');
    }
  }
  }

  
  
  

