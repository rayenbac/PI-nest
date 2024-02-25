import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductModel } from './entities/Product.entity';
import { databaseProviders } from 'src/config/database.config';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/user/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/user/entities/jwt-auth.guard';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'e9ea9aa33c55a0c793c0d9429d62924c620a6db1e56ccbd2188070b855589ab5', // Replace with your actual secret key
          signOptions: { expiresIn: '1h' }, // Adjust as needed
        }),
      ],
    controllers: [ProductController],
    providers: [ProductService, ProductModel, AuthService, JwtAuthGuard, ...databaseProviders, { provide: 'PRODUCT_MODEL', useValue: ProductModel }],
    exports: [ProductService, ProductModel],
})
export class ProductModule {}
