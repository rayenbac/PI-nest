import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/invoice/entities/invoice.dto';
import { Invoice } from 'src/invoice/entities/Invoice.entity';

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
}
