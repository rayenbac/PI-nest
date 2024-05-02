import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/invoice/entities/invoice.dto';
import { Invoice } from 'src/invoice/entities/Invoice.entity';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModel } from 'src/user/entities/User.model';
import { isValidObjectId } from 'mongoose';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Get()
  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findAllInvoices();
  }

  @Get(':id')
  async findInvoiceById(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findInvoiceById(id);
  }

  @Put(':id')
  async updateInvoice(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.deleteInvoice(id);
  }

  @UseGuards(AuthGuard)
  @Post('by-company')
  async createInvoicebycompany(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req) {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    const invoiceData = { ...createInvoiceDto, companyId: user.company._id }; // Set the company ID from the user
    const invoice = await this.invoiceService.createInvoiceWithUser(invoiceData, user);
    return invoice;
  }

  @Get('by-company/:companyId')
  async findInvoiceByCompany(@Param('companyId') companyId: string): Promise<Invoice[]> {
    if (!isValidObjectId(companyId)) {
      throw new NotFoundException('Invalid company ID');
    }

    return this.invoiceService.findInvoiceByCompany(companyId);
  }
  
}
