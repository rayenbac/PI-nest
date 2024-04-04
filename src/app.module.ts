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
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RateLimitMiddleware } from './user/entities/rate-limit.middleware';


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
    // Apply LoggerMiddleware for all routes
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // Apply SessionMiddleware for all routes except /auth/login
    consumer.apply(SessionMiddleware).exclude('http://localhost:3000/auth/login').forRoutes('*');

    // Apply CORS middleware to all routes
    consumer.apply((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Update with your Angular app's URL
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');

      if (req.method === 'OPTIONS') {
        res.sendStatus(204);
      } else {
        next();
      }
    }).forRoutes('*');

    // Apply rate-limiting middleware for the login route only
    // consumer.apply(RateLimitMiddleware).forRoutes('auth/login');
  }
  
}