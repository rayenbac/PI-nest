import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  nameS:{ type: String, required: true },
  contactInfo: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
});

export interface Supplier extends mongoose.Document {
  nameS: string;
  contactInfo: string;
  products: mongoose.Types.ObjectId[];
}

export const SupplierModel = mongoose.model<Supplier>('Supplier', SupplierSchema);
