import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/services/User.service';
import { CreateUserDto, UpdateUserDto } from 'src/user/entities/user.dto';
import { User } from 'src/user/entities/User.model';
import { AuthGuard } from '../entities/jwt-auth.guard';
import { CreateCompanyDto } from 'src/company/entities/company.dto';
import { CompanyService } from 'src/company/services/company.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly companyService: CompanyService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto, @Body('company') companyDto: CreateCompanyDto): Promise<User> {
    const createdCompany = await this.companyService.create(companyDto);
    return this.userService.createUser(createUserDto, createdCompany._id);
  }

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
}
