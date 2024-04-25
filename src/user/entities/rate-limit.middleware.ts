// rate-limit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly limiter;

  constructor() {
    this.limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 3, // Max 3 requests per windowMs
      message: 'Too many login attempts from this IP, please try again later',
    });
  }

  use(req: any, res: any, next: () => void) {
    // Apply rate limiting middlewared
    this.limiter(req, res, next);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
