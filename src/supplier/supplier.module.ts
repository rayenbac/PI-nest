import { Module } from '@nestjs/common';
import { SupplierController } from './controllers/supplier.controller';
import { SupplierModel } from './entities/Supplier.model';
import { SupplierService } from './services/supplier.service';
import { databaseProviders } from 'src/config/database.config';

@Module({
    controllers: [SupplierController],
    providers: [SupplierService, SupplierModel,
        ...databaseProviders,
        { provide: 'SUPPLIER_MODEL', useValue: SupplierModel },
    ],
    exports: [SupplierService, SupplierModel],})
export class SupplierModule {}
