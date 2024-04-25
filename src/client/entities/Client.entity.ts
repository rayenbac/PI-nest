import * as mongoose from 'mongoose';
import { OrderSchema, Order } from '../../order/entities/Order.entity';

export const ClientSchema = new mongoose.Schema({
<<<<<<< HEAD
 
=======
>>>>>>> origin/master
  nameC:{ type: String, required: true },
  phoneNumber: { type: String, required: true },
  reference: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
<<<<<<< HEAD
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company
=======
>>>>>>> origin/master
});

export interface Client extends mongoose.Document {
  nameC: string;
  phoneNumber: string;
  reference: string;
  orders: Order[];
<<<<<<< HEAD
  createdBy: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId; 
=======
>>>>>>> origin/master
}

export const ClientModel = mongoose.model<Client>('Client', ClientSchema);
