// product.model.ts

import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  nameP: { type: String, required: true },
  discount: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company// Reference to Supplier
});

export interface Product extends mongoose.Document {
  nameP: string;
  discount: number;
  price: number;
  quantity: number;
  type: string;
  supplier: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;

}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
