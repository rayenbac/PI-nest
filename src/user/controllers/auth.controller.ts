import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.login, req.body.password);

    if (!user) {
      return { statusCode: 401, message: 'Unauthorized' };
    }

    
    return { statusCode: 200, message: 'Login successful', user };
  }
}