// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/user/entities/User.model';
import { jwtConstants } from '../entities/constants'; // Import your custom secret key

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

    // Sign the JWT with the predefined secret key
    const token = this.jwtService.sign({ userId: user._id }, { secret: jwtConstants.secret });

    return { token };
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
