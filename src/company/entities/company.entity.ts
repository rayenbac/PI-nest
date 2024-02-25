import * as mongoose from 'mongoose';


export const CompanySchema = new mongoose.Schema({
  nameCompany:{ type: String, required: true },


});

export interface Company extends mongoose.Document {
  nameCompany: string;

}

export const CompanyModel = mongoose.model<Company>('Company', CompanySchema);
