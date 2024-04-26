import { Body, Controller, Get, Post, Query, Req, Request, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
  import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../entities/jwt-auth.guard';
import { UserModel } from '../entities/User.model';
import { ChatGateway } from '../entities/chat.gateway';
import { MessageService } from '../services/message.service';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService,
      private readonly chatGateway: ChatGateway,
      private readonly messageService: MessageService, 
    ) {}

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
  @UseGuards(AuthGuard) // Apply AuthGuard to authenticate requests
@Post('change-password')
async changePassword(@Request() req, @Body() body: { currentPassword: string, newPassword: string }): Promise<void> {
    try {
        const userId = req.user.userId; // Extract user ID from the request
        await this.authService.changePassword(userId, body.currentPassword, body.newPassword);
    } catch (error) {
        // Handle errors
        throw new UnauthorizedException('Failed to change password');
    }

}
@UseGuards(AuthGuard)
@Post('messages')
async sendMessage(@Body() messageData: any, @Request() req) {
  const { senderId, recipientId, content } = messageData;

  // Save the message to the database
  const message = await this.messageService.createMessage(senderId, recipientId, content);

  // Emit the message to the recipient's WebSocket connection
  this.chatGateway.sendMessageToUser(recipientId, message);

  return { statusCode: 200, message: 'Message sent successfully' };
}

  @UseGuards(AuthGuard)
  @Get('messages')
  async getChatHistory(@Query('recipientId') recipientId: string, @Request() req) {
    const userId = req.user.userId;

    // Get the chat history between the current user and the recipient
    const chatHistory = await this.messageService.getChatHistory(userId, recipientId);

    return { statusCode: 200, chatHistory };
  }
  
}