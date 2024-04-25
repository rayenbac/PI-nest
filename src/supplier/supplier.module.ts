import { Module } from '@nestjs/common';
import { SupplierController } from './controllers/supplier.controller';
import { SupplierModel } from './entities/Supplier.model';
import { SupplierService } from './services/supplier.service';
import { databaseProviders } from 'src/config/database.config';
<<<<<<< HEAD
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/user/entities/constants';
import { AuthService } from 'src/user/services/auth.service';
import { AuthGuard } from 'src/user/entities/jwt-auth.guard';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret, // Replace with your actual secret key
          signOptions: { expiresIn: '1h' }, // Adjust as needed
        }),
      ],
    controllers: [SupplierController],
    providers: [SupplierService, SupplierModel,AuthService, AuthGuard,
=======

@Module({
    controllers: [SupplierController],
    providers: [SupplierService, SupplierModel,
>>>>>>> origin/master
        ...databaseProviders,
        { provide: 'SUPPLIER_MODEL', useValue: SupplierModel },
    ],
    exports: [SupplierService, SupplierModel],})
export class SupplierModule {}
