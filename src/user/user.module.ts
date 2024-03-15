import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/User.service';
import { UserModel } from './entities/User.model';
import { databaseProviders } from 'src/config/database.config';
import { AuthController } from 'src/user/controllers/auth.controller';
import { AuthService } from 'src/user/services/auth.service';
import { SessionMiddleware } from 'src/user/entities/session.middleware';

import { jwtConstants } from './entities/constants';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '5h' }, 
    }),

  ],
  controllers: [UserController,AuthController],
  providers: [UserService, UserModel,AuthService,JwtService,
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