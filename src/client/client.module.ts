import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { ClientModel } from './entities/Client.entity';
import { databaseProviders } from 'src/config/database.config';
import { OrderModule } from 'src/order/order.module';
<<<<<<< HEAD
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/entities/constants';

@Module({
  imports: [
    UserModule,OrderModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret, // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust as needed
    }),
  ],
=======

@Module({
  imports: [OrderModule],
>>>>>>> origin/master
  controllers: [ClientController],
  providers: [ClientService, ClientModel,
    ...databaseProviders,
    { provide: 'CLIENT_MODEL', useValue: ClientModel },
],
  exports: [ClientService, ClientModel],
})
export class ClientModule {}
