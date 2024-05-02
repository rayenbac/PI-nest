import { Injectable, NestMiddleware } from '@nestjs/common';
import { Server } from 'socket.io';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class WebSocketCorsMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    // Set CORS headers for WebSocket connections
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Adjust with your Angular app's URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
  }
}
