// invoice.model.ts

import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema({
  dueDate: Date,
  refInvoice: String,
});

export interface Invoice extends mongoose.Document {
  dueDate: Date;
  refInvoice: string;
}

export const InvoiceModel = mongoose.model<Invoice>('Invoice', InvoiceSchema);
