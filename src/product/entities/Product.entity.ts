// product.model.ts

import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  nameP: { type: String, required: true },
  discount: { type: Number, required: true },
  Salingprice: { type: Number, required: true },
  Buyingprice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, // Reference to Supplier
});

export interface Product extends mongoose.Document {
  nameP: string;
  discount: number;
  Salingprice: number;
  Buyingprice :number;
  quantity: number;
  type: string;
  supplier: mongoose.Types.ObjectId;

}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
