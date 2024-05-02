import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceModel } from './entities/Invoice.entity';
import { InvoiceService } from './services/invoice.service';
import { databaseProviders } from 'src/config/database.config';
import { AuthService } from 'src/user/services/auth.service';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/entities/constants';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret, // Replace with your actual secret key
          signOptions: { expiresIn: '1h' }, // Adjust as needed
        }),
      ],
    controllers: [InvoiceController],
    providers: [InvoiceService, InvoiceModel,AuthService,AuthGuard,
        ...databaseProviders,
        { provide: 'INVOICE_MODEL', useValue: InvoiceModel },
    ],
    exports: [InvoiceService, InvoiceModel],})
export class InvoiceModule {}
