import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CompanyModule } from './company/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, ClientModule, OrderModule, ProductModule, SupplierModule, InvoiceModule,CompanyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'e9ea9aa33c55a0c793c0d9429d62924c620a6db1e56ccbd2188070b855589ab5',
      signOptions: { expiresIn: '1h' }, // Adjust as needed
    }),],
})
export class AppModule {}
