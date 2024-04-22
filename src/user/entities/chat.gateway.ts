// chat.gateway.ts

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './message.model';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  sendMessageToUser(userId: string, message: Message) {
    const client = this.server.sockets.sockets[userId];

    if (client) {
      client.emit('chatMessage', message);
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
