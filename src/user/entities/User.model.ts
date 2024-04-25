import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/company/entities/company.entity';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  login: { 
    type: String, 
    unique: true, 
    required: true,
    validate: {
      validator: function(v: string) {
        //Regular Expression
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} NOT A VALID EMAIL`
    }
  },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        // At least 8 characters with at least one letter and one number
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
      },
      message: props => `The password must be at least 8 characters long and contain at least one letter and one number!`
    }
  },
  role: { type: String, enum: ['admin', 'salesManager', 'stockManager', 'auditor','SuperAdmin'], default: 'admin' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'  },
  picture: { type: String },
  isActive: { type: Boolean, default: true }

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
  fullName: string;
  login: string;
  password: string;
  role: 'admin' | 'salesManager' | 'stockManager' | 'auditor' | 'SuperAdmin';
  company?: mongoose.Types.ObjectId | Company;
  picture?: string;
  isActive?: Boolean;

}
export const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);
