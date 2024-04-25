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
