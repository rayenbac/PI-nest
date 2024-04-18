import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { ClientModel } from './entities/Client.entity';
import { databaseProviders } from 'src/config/database.config';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [ClientController],
  providers: [ClientService, ClientModel,
    ...databaseProviders,
    { provide: 'CLIENT_MODEL', useValue: ClientModel },
],
  exports: [ClientService, ClientModel],
})
export class ClientModule {}
