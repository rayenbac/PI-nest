import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; 
import { UserModel } from './User.model';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request & { user: typeof UserModel }, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token part after "Bearer "

    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, 'e9ea9aa33c55a0c793c0d9429d62924c620a6db1e56ccbd2188070b855589ab5');
        const user = await UserModel.findById(decodedToken.userId);

        if (user) {
          req.user = user;
        }
      } catch (error) {
        // Handle invalid or expired token
        console.error('JWT verification error:', error.message);
      }
    }

    next();
  }
}
