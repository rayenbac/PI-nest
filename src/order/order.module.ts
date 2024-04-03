import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderModel } from './entities/Order.entity';
import { OrderService } from './services/order.service';
import { databaseProviders } from 'src/config/database.config';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderModel,
        ...databaseProviders,
        { provide: 'ORDER_MODEL', useValue: OrderModel },
    ],
    exports: [OrderService, OrderModel],})
export class OrderModule {}
