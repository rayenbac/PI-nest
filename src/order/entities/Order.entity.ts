// order.model.ts

import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  totalPrice: Number,
  status: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', unique: true },

});

export interface Order extends mongoose.Document {
  totalPrice: number;
  status: string;
  client: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[]; 
  invoice: mongoose.Types.ObjectId;
}

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);