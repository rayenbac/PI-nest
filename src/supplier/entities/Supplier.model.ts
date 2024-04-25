import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  nameS:{ type: String, required: true },
  address : { type: String, required: true },
  phoneNumber : { type: Number, required: true },
  productType : { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company
});

export interface Supplier extends mongoose.Document {
  nameS: string;
  address: string;
  phoneNumber: number;
  productType: string;
  products: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId; 
}

export const SupplierModel = mongoose.model<Supplier>('Supplier', SupplierSchema);