import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductModel } from './entities/Product.entity';
import { databaseProviders } from 'src/config/database.config';

@Module({
    controllers: [ProductController],
    providers: [ProductService, ProductModel,
        ...databaseProviders,
        { provide: 'PRODUCT_MODEL', useValue: ProductModel }, 
    ],
    exports: [ProductService, ProductModel],})
export class ProductModule {}
