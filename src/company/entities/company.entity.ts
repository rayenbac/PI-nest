<<<<<<< HEAD
import { Document, Schema, Model, model } from 'mongoose';

export interface Company extends Document {
  nameCompany?: string;
  address?: string;
  phoneNumber?: string;
}

const CompanySchema: Schema = new Schema({
  nameCompany: { type: String },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
});

export const CompanyModel: Model<Company> = model<Company>('Company', CompanySchema);
=======
import * as mongoose from 'mongoose';


export const CompanySchema = new mongoose.Schema({
  nameCompany:{ type: String, required: true },


});

export interface Company extends mongoose.Document {
  nameCompany: string;

}

export const CompanyModel = mongoose.model<Company>('Company', CompanySchema);
>>>>>>> origin/master
