import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; 
import { UserModel } from './User.model';
import { jwtConstants } from './constants';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request & { user: typeof UserModel }, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, jwtConstants.secret);
        const user = await UserModel.findById(decodedToken.userId);

        if (user) {
          req.user = user;
        }
      } catch (error) {

        console.error('JWT verification error:', error.message);
      }
    }

    next();
  }
}
