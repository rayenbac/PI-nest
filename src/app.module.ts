// app.module.ts

import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service'; // Import UserService
import { UserModel } from './models/user.model'; // Import UserModel

@Module({
  controllers: [UserController],
  providers: [
    UserService, // Provide UserService
    ...databaseProviders,
    { provide: 'USER_MODEL', useValue: UserModel }, // Provide UserModel as USER_MODEL
  ],
})
export class AppModule {}
