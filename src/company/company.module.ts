import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyModel } from './entities/company.entity';
import { databaseProviders } from 'src/config/database.config';

@Module({
  providers: [CompanyService,
    CompanyModel,
    ...databaseProviders,
    { provide: 'COMPANY_MODEL', useValue: CompanyModel },
],
  controllers: [CompanyController],
  exports: ['COMPANY_MODEL' , CompanyService],
})
export class CompanyModule {}
