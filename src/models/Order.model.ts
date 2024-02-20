// order.model.ts

import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  totalPrice: Number,
  status: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

export interface Order extends mongoose.Document {
  totalPrice: number;
  status: string;
  client: mongoose.Types.ObjectId;
}

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);