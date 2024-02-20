import * as mongoose from 'mongoose';
import { OrderSchema, Order } from './order.model';

export const ClientSchema = new mongoose.Schema({
  nameC: String,
  phoneNumber: String,
  reference: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export interface Client extends mongoose.Document {
  nameC: string;
  phoneNumber: string;
  reference: string;
  orders: Order[];
}

export const ClientModel = mongoose.model<Client>('Client', ClientSchema);
