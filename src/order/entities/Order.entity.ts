// order.model.ts

import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company
});

export interface Order extends mongoose.Document {
  totalPrice: number;
  status: string;
  client: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId; 
}
export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
