import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/user/entities/User.model';

@Injectable()
export class AuthService {
    async validateUser(login: string, password: string): Promise<User | null> {
      const user = await UserModel.findOne({ login });
  
      if (!user) {
        return null; 
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return null; 
      }
  
      return user;
    }
  }