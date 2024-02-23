import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [UserModule, ClientModule, OrderModule, ProductModule, SupplierModule, InvoiceModule],
})
export class AppModule {}
