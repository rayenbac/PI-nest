import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SupplierService } from 'src/supplier/services/supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from 'src/supplier/entities/supplier.dto';
import { Supplier } from 'src/supplier/entities/Supplier.model';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

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
}
