import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  nameS:{ type: String, required: true },
<<<<<<< HEAD
  address : { type: String, required: true },
  phoneNumber : { type: Number, required: true },
  productType : { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company
=======
  contactInfo: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
>>>>>>> origin/master
});

export interface Supplier extends mongoose.Document {
  nameS: string;
<<<<<<< HEAD
  address: string;
  phoneNumber: number;
  productType: string;
  products: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId; 
}

export const SupplierModel = mongoose.model<Supplier>('Supplier', SupplierSchema);
=======
  contactInfo: string;
  products: mongoose.Types.ObjectId[];
}

export const SupplierModel = mongoose.model<Supplier>('Supplier', SupplierSchema);
>>>>>>> origin/master
