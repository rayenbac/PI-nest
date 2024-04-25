// supplier.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Supplier } from 'src/supplier/entities/Supplier.model';
import { CreateSupplierDto, UpdateSupplierDto } from 'src/supplier/entities/supplier.dto';
import { User } from 'src/user/entities/User.model';

@Injectable()
export class SupplierService {
  constructor(@Inject('SUPPLIER_MODEL') private readonly supplierModel: Model<Supplier>) {}


  async createSupplierWithUser(CreateSupplierDto: CreateSupplierDto, user: User): Promise<Supplier> {
    const createdSupplier = new this.supplierModel({
      ...CreateSupplierDto,
      createdBy: user._id,
     company:user.company._id
    });
    return createdSupplier.save();
  }

  async createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }

  async findSupplierById(supplierId: string): Promise<Supplier> {
    return this.supplierModel.findById(supplierId).exec();
  }

  async updateSupplier(supplierId: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierModel.findByIdAndUpdate(supplierId, updateSupplierDto, { new: true }).exec();
  }

  async deleteSupplier(supplierId: string): Promise<Supplier> {
    return this.supplierModel.findByIdAndDelete(supplierId).exec();
  }

  async findsuppliersByCompany(companyId: string): Promise<Supplier[]> {
    return this.supplierModel.find({ company: companyId }).exec();
  }

}
