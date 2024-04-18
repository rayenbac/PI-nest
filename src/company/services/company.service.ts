// company.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCompanyDto, UpdateCompanyDto } from '../entities/company.dto';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_MODEL')
    private readonly companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findOne(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
