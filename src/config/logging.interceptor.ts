import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const start = Date.now();
    const requestLog = {
      method,
      originalUrl,
      headers,
      body,
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const responseBody = res.locals.responseBody; // Access the response body stored in res.locals
      const responseLog = {
        statusCode,
        headers: res.getHeaders(),
        body: responseBody,
      };
      this.logger.log({
        request: requestLog,
        response: responseLog,
        duration: `${duration}ms`,
      });
    });

    next();
  }
}
