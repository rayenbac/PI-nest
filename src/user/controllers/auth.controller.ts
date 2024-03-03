  import { Body, Controller, Post, Query} from '@nestjs/common';
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

    @Post('forgot-password')
  async forgotPassword(@Body('login') login: string) {
    const resetToken = await this.authService.generateResetToken(login);
    // Send the reset token to the user (via email, SMS, etc.)
    return { statusCode: 200, message: 'Reset token generated successfully' };
  }

  @Post('reset-password')
  async resetPassword(@Query('token') resetToken: string, @Body('newPassword') newPassword: string) {
    const result = await this.authService.resetPassword(resetToken, newPassword);
    if (!result) {
      return { statusCode: 401, message: 'Invalid or expired reset token' };
    }
    return { statusCode: 200, message: 'Password reset successful' };
  }
}
  