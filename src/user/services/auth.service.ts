// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/user/entities/User.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(login: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    // Generate a unique secret key for the user
    const secretKey = this.generateSecretKeyForUser(user);

    // Sign the JWT with the user's unique secret key
    const token = this.jwtService.sign({ userId: user._id }, { secret: secretKey });

    return { token };
  }

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

  // Function to generate a unique secret key for the user
  private generateSecretKeyForUser(user: User): string {
    return `${user._id}_${user.login}`; 
  }
}
