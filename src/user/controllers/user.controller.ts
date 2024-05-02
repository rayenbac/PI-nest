import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile, Req, Res, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/services/User.service';
import { CreateUserDto, UpdateUserDto } from 'src/user/entities/user.dto';
import { User } from 'src/user/entities/User.model';
import { AuthGuard } from '../entities/jwt-auth.guard';
import { CreateCompanyDto } from 'src/company/entities/company.dto';
import { CompanyService } from 'src/company/services/company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import * as fs from 'fs';
import { SuperAdminGuard } from '../entities/superadmin.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly companyService: CompanyService) {}

 /* @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto, @Body('company') companyDto: CreateCompanyDto): Promise<User> {
    const createdCompany = await this.companyService.create(companyDto);
    return this.userService.createUser(createUserDto, createdCompany._id);
  }*/

  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
  @UseGuards(AuthGuard)
  @Get(':companyId/users')
  async findAllUsersCompany(@Param('companyId') companyId: string): Promise<User[]> {
  return this.userService.findAllUsersByCompany(companyId);
}
@UseGuards(SuperAdminGuard, AuthGuard)
@Put(':id/deactivate')
async deactivateUser(@Param('id') id: string): Promise<User> {
  return this.userService.deactivateUser(id);
  
}

@UseGuards(SuperAdminGuard, AuthGuard)
  @Put(':id/activate')
  async activateUser(@Param('id') id: string): Promise<User> {
    return this.userService.activateUser(id);
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto, @Body('company') companyDto: CreateCompanyDto): Promise<User> {
    let createdCompany;
    if (companyDto) {
      createdCompany = await this.companyService.create(companyDto);
    }
    return this.userService.createUser(createUserDto, createdCompany ? createdCompany._id : undefined);
  }


  @Post('assign')
async AssignUser(@Body() createUserDto: CreateUserDto, @Body('companyId') companyId: string): Promise<User> {
    // Create the user with the specified company ID
    return this.userService.createUser(createUserDto, companyId);
}

  /*
  @UseGuards(AuthGuard)
  @Post('uploadPicture')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadPicture(@UploadedFile() file: any, @Req() req: Request) {
    const userId = req.user.userId; // Access the user property without TypeScript errors
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }
    await this.userService.uploadPicture(userId, file);
  }
*/
}
/*
  @Get(':userId/profile-picture')
  async getProfilePicture(@Param('userId') userId: string, @Res() res: any) {
    try {
      const user = await this.userService.findUserById(userId);
      if (user && user.picture) {
        return res.sendFile(user.picture);
      } else {
        return res.status(404).json({ message: 'Profile picture not found' });
      }
    } catch (error) {
      console.error('Failed to serve profile picture:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
*/