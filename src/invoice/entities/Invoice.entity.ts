// invoice.model.ts

import * as mongoose from 'mongoose';


export const InvoiceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  // refInvoice:{ type: String, required: true },
  gain: { type: Number },
  revenu: { type: Number },
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

});

export interface Invoice extends mongoose.Document {
  date: string;
  // refInvoice: string;
  gain: number;
  revenu: number;
}

export const InvoiceModel = mongoose.model<Invoice>('Invoice', InvoiceSchema);
