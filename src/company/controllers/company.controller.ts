// company.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../entities/company.dto';
<<<<<<< HEAD
import { Company } from '../entities/company.entity';
=======
>>>>>>> origin/master


@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
<<<<<<< HEAD
  async deleteCompany(@Param('id') id: string): Promise<Company> {
=======
  remove(@Param('id') id: string) {
>>>>>>> origin/master
    return this.companyService.remove(id);
  }
}
