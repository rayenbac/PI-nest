import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'salesManager', 'stockManager', 'auditor'], default: 'admin' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export interface User extends mongoose.Document {
  Fullname: string;
  login: string;
  password: string;
  role: 'admin' | 'salesManager' | 'stockManager' | 'auditor';
  company: mongoose.Types.ObjectId;
}

export const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);
