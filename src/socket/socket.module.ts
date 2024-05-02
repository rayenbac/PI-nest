import { Logger, Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Module({
  providers: [NotificationService,Logger]
})
export class SocketModule {
  
  constructor(private readonly notificationService: NotificationService) {}



}
