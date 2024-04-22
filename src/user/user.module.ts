import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/User.service';
import { UserModel } from './entities/User.model';
import { databaseProviders } from 'src/config/database.config';
import { AuthController } from 'src/user/controllers/auth.controller';
import { AuthService } from 'src/user/services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './entities/constants';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { MessageService } from './services/message.service';
import { ChatGateway } from './entities/chat.gateway';
import { MessageModel } from './entities/message.model';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, 
    }),
    MulterModule.register({
      dest: '/uploads/', // Specify the destination folder for uploaded files
    }),
  ],
  controllers: [UserController,AuthController],
  providers: [
    UserService, 
    UserModel, 
    AuthService,
    JwtService,
    MessageService,
    ChatGateway,
    ...databaseProviders,
    { provide: 'USER_MODEL', useValue: UserModel },
    { provide: 'MessageModel', useValue: MessageModel }, // Assuming you have a MessageModel defined
  ],
  
  exports: [UserService, UserModel,AuthService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const upload = multer({ dest: 'uploads/' }); // Configure multer to save files to the 'uploads' directory
    consumer
      .apply(upload.single('picture')) // 'picture' is the name of the field in your form data
      .forRoutes('users/uploadPicture'); // Define the route where you want to handle file uploads
  }
}