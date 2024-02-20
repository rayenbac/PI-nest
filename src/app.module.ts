// app.module.ts

import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service'; 
import { UserModel } from './models/user.model'; 
import { ClientController } from './controllers/client/client.controller';
import { ClientService } from './services/client/client.service'; 
import { ClientModel } from './models/client.model'; 
import { OrderController } from './controllers/order/order.controller';
import { OrderService } from './services/order/order.service';
import { OrderModel } from './models/order.model'; 
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { ProductModel } from './models/Product.model';
import { SupplierModel } from './models/Supplier.model';
import { SupplierService } from './services/supplier/supplier.service';
import { SupplierController } from './controllers/supplier/supplier.controller';
import { InvoiceModel } from './models/Invoice.model';
import { InvoiceService } from './services/invoice/invoice.service';
import { InvoiceController } from './controllers/invoice/invoice.controller';

@Module({
  controllers: [UserController, ClientController, OrderController,ProductController,SupplierController,InvoiceController],
  providers: [
    UserService, 
    ClientService, 
    OrderService,
    ProductService,
    SupplierService,
    InvoiceService,
    ...databaseProviders,
    { provide: 'USER_MODEL', useValue: UserModel }, 
    { provide: 'CLIENT_MODEL', useValue: ClientModel },
    { provide: 'ORDER_MODEL', useValue: OrderModel },
    { provide: 'PRODUCT_MODEL', useValue: ProductModel }, 
    { provide: 'SUPPLIER_MODEL', useValue: SupplierModel },
    { provide: 'INVOICE_MODEL', useValue: InvoiceModel },
    
  ],
})
export class AppModule {}
