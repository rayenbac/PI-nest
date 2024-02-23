import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceModel } from './entities/Invoice.entity';
import { InvoiceService } from './services/invoice.service';
import { databaseProviders } from 'src/config/database.config';

@Module({
    controllers: [InvoiceController],
    providers: [InvoiceService, InvoiceModel,
        ...databaseProviders,
        { provide: 'INVOICE_MODEL', useValue: InvoiceModel },
    ],
    exports: [InvoiceService, InvoiceModel],})
export class InvoiceModule {}
