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
import { jwtConstants } from './user/entities/constants';

@Module({
  imports: [UserModule, ClientModule, OrderModule, ProductModule, SupplierModule, InvoiceModule,CompanyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret, // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust as needed
    }),
    // Other modules...
  ],
})
export class AppModule {}
