// invoice.model.ts

import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema({
  dueDate: { type: Date, required: true },
  refInvoice:{ type: String, required: true },
});

export interface Invoice extends mongoose.Document {
  dueDate: Date;
  refInvoice: string;
}

export const InvoiceModel = mongoose.model<Invoice>('Invoice', InvoiceSchema);
