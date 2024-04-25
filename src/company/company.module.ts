import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
<<<<<<< HEAD
import { CompanyModel } from './entities/company.entity'; // Import the model
import { databaseProviders } from 'src/config/database.config';

@Module({
  providers: [
    CompanyService,
    ...databaseProviders,
    { provide: 'COMPANY_MODEL', useValue: CompanyModel },
  ],
  controllers: [CompanyController],
  exports: ['COMPANY_MODEL', CompanyService],
})
export class CompanyModule {}
=======
import { CompanyModel } from './entities/company.entity';
import { databaseProviders } from 'src/config/database.config';

@Module({
  providers: [CompanyService,
    CompanyModel,
    ...databaseProviders,
    { provide: 'COMPANY_MODEL', useValue: CompanyModel },
],
  controllers: [CompanyController]
})
export class CompanyModule {}
>>>>>>> origin/master
