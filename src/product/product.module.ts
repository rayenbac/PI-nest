import { Logger, Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductModel } from './entities/Product.entity';
import { databaseProviders } from 'src/config/database.config';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/user/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { jwtConstants } from 'src/user/entities/constants';
import { SocketModule } from 'src/socket/socket.module';
import { NotificationService } from 'src/socket/notification/notification.service';




@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret, // Replace with your actual secret key
          signOptions: { expiresIn: '1h' }, // Adjust as needed
        }),
      ],
    controllers: [ProductController],
    providers: [ProductService, ProductModel, AuthService, AuthGuard,NotificationService, ...databaseProviders, { provide: 'PRODUCT_MODEL', useValue: ProductModel },Logger],
    exports: [ProductService, ProductModel],
})
export class ProductModule {}
