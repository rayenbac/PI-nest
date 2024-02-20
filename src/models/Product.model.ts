// product.model.ts

import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  nameP: String,
  discount: Number,
  price: Number,
  quantity: Number,
  type: String,
});

export interface Product extends mongoose.Document {
  nameP: string;
  discount: number;
  price: number;
  quantity: number;
  type: string;
}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
