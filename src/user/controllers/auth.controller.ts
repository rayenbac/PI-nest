  import { Body, Controller, Post} from '@nestjs/common';
  import { AuthService } from '../services/auth.service';
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body('login') login: string, @Body('password') password: string) {
      const result = await this.authService.login(login, password);

      if (!result) {
        return { statusCode: 401, message: 'Unauthorized' };
      }

      return { statusCode: 200, message: 'Login successful', token: result.token };
    }
  }