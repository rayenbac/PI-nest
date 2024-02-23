import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  
  fullName: String,
  login: String,
  password: String,
});

export interface User extends mongoose.Document {
  Fullname: string;
  login: string;
  password: string;
}

export const UserModel = mongoose.model<User>('User', UserSchema);
