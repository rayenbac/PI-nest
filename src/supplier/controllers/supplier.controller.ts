<<<<<<< HEAD
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { SupplierService } from 'src/supplier/services/supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from 'src/supplier/entities/supplier.dto';
import { Supplier } from 'src/supplier/entities/Supplier.model';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModel } from 'src/user/entities/User.model';
import { isValidObjectId } from 'mongoose';
=======
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SupplierService } from 'src/supplier/services/supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from 'src/supplier/entities/supplier.dto';
import { Supplier } from 'src/supplier/entities/Supplier.model';
>>>>>>> origin/master

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

<<<<<<< HEAD

  @UseGuards(AuthGuard)
  @Post('by-company')
  async createSupplierbycompany(@Body() CreateSupplierDto: CreateSupplierDto, @Request() req) {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    const supplierData = { ...CreateSupplierDto, companyId: user.company._id }; // Set the company ID from the user
    const supplier = await this.supplierService.createSupplierWithUser(supplierData, user);
    return supplier;
  }

=======
>>>>>>> origin/master
  @Post()
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Get()
  async findAllSuppliers(): Promise<Supplier[]> {
    return this.supplierService.findAllSuppliers();
  }

  @Get(':id')
  async findSupplierById(@Param('id') id: string): Promise<Supplier> {
    return this.supplierService.findSupplierById(id);
  }

  @Put(':id')
  async updateSupplier(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierService.updateSupplier(id, updateSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: string): Promise<Supplier> {
    return this.supplierService.deleteSupplier(id);
  }
<<<<<<< HEAD

  @Get('by-company/:companyId')
  async findsuplliersByCompany(@Param('companyId') companyId: string): Promise<Supplier[]> {
    if (!isValidObjectId(companyId)) {
      throw new NotFoundException('Invalid company ID');
    }

    return this.supplierService.findsuppliersByCompany(companyId);
  }

=======
>>>>>>> origin/master
}
