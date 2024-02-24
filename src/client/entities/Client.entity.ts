import * as mongoose from 'mongoose';
import { OrderSchema, Order } from '../../order/entities/Order.entity';

export const ClientSchema = new mongoose.Schema({
  nameC:{ type: String, required: true },
  phoneNumber: { type: String, required: true },
  reference: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export interface Client extends mongoose.Document {
  nameC: string;
  phoneNumber: string;
  reference: string;
  orders: Order[];
}

export const ClientModel = mongoose.model<Client>('Client', ClientSchema);
