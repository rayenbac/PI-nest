import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/User.service';
import { UserModel } from './entities/User.model';
import { databaseProviders } from 'src/config/database.config';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModel,
    ...databaseProviders,
    { provide: 'USER_MODEL', useValue: UserModel }, 
],
  exports: [UserService, UserModel],
})
export class UserModule {}
