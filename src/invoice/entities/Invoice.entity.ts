// invoice.model.ts

import * as mongoose from 'mongoose';


export const InvoiceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  // refInvoice:{ type: String, required: true },
  gain: { type: Number },
  revenu: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company// Reference to Supplier
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

});

export interface Invoice extends mongoose.Document {
  date: string;
  // refInvoice: string;
  gain: number;
  revenu: number;
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;

  
}

export const InvoiceModel = mongoose.model<Invoice>('Invoice', InvoiceSchema);
