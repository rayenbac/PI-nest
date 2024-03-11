  import { Body, Controller, Get, Post, Query, Request, Res, UseGuards} from '@nestjs/common';
  import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../entities/jwt-auth.guard';
import { UserModel } from '../entities/User.model';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
async login(@Body('login') login: string, @Body('password') password: string, @Res() res) {
  const result = await this.authService.login(login, password);

  if (!result) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.status(200).json({ message: 'Login successful', token: result.token });
}
    @Post('forgot-password')
  async forgotPassword(@Body('login') login: string) {
    const resetToken = await this.authService.generateResetToken(login);
    // Send the reset token to the user (via email)
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

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('User ID:', req.user.userId); // Log the user ID
    const user = await UserModel.findById(req.user.userId).populate('company');
    console.log('User:', user); // Log the user object fetched from the database
    return user; // Return the user object in the response
  }
  
}
  