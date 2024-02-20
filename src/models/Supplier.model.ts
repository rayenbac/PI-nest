import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  nameS: String,
  contactInfo: String,
});

export interface Supplier extends mongoose.Document {
  nameS: string;
  contactInfo: string;
}

export const SupplierModel = mongoose.model<Supplier>('Supplier', SupplierSchema);
