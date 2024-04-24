// invoice.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Invoice } from '../entities/Invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/invoice/entities/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(@Inject('INVOICE_MODEL') private readonly invoiceModel: Model<Invoice>) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }

  async findInvoiceById(invoiceId: string): Promise<Invoice> {
    return this.invoiceModel.findById(invoiceId).exec();
  }

  async updateInvoice(invoiceId: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    return this.invoiceModel.findByIdAndUpdate(invoiceId, updateInvoiceDto, { new: true }).exec();
  }

  async deleteInvoice(invoiceId: string): Promise<Invoice> {
    return this.invoiceModel.findByIdAndDelete(invoiceId).exec();
  }  
}