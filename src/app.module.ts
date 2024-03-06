import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CompanyModule } from './company/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user/entities/constants';
import { LoggerMiddleware } from './config/logging.interceptor';
import { SessionMiddleware } from './user/entities/session.middleware';


@Module({
  imports: [UserModule, ClientModule, OrderModule, ProductModule, SupplierModule, InvoiceModule,CompanyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '1h' }, 
    }),
    

  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Apply LoggerMiddleware for all routes
      .forRoutes('*'); // Apply to all routes

    consumer
      .apply(SessionMiddleware)
      .exclude('http://localhost:3000/auth/login') // Apply SessionMiddleware for all routes
      .forRoutes('*'); // Apply to all routes
  }
}