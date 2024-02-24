import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/User.service';
import { UserModel } from './entities/User.model';
import { databaseProviders } from 'src/config/database.config';
import { AuthController } from 'src/user/controllers/auth.controller';
import { AuthService } from 'src/user/services/auth.service';
import { SessionMiddleware } from 'src/user/entities/session.middleware';

@Module({
  controllers: [UserController,AuthController],
  providers: [UserService, UserModel,AuthService,
    ...databaseProviders,
    { provide: 'USER_MODEL', useValue: UserModel }, 
],
  exports: [UserService, UserModel],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*');
  }
}