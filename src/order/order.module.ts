import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderModel } from './entities/Order.entity';
import { OrderService } from './services/order.service';
import { databaseProviders } from 'src/config/database.config';
<<<<<<< HEAD
import { AuthService } from 'src/user/services/auth.service';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/entities/constants';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret, // Replace with your actual secret key
          signOptions: { expiresIn: '1h' }, // Adjust as needed
        }),
      ],
    controllers: [OrderController],
    providers: [OrderService, OrderModel,AuthService, AuthGuard,
=======

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderModel,
>>>>>>> origin/master
        ...databaseProviders,
        { provide: 'ORDER_MODEL', useValue: OrderModel },
    ],
    exports: [OrderService, OrderModel],})
export class OrderModule {}
