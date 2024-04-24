import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/user/entities/User.model';
import { jwtConstants } from '../entities/constants'; 
import * as mailjet from 'node-mailjet'; 

@Injectable()
export class AuthService {
  private readonly mailjetClient;

  constructor(private readonly jwtService: JwtService) {
    this.mailjetClient = mailjet.connect('f0d1f00135c86c5beb143f0052226895', '991d774ee912ba9666bfac369724ba27', {
      version: 'v3.1',
      perform_api_call: true,
    });
  }

  async login(login: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is not active');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Sign the JWT with the predefined secret key
    const token = this.jwtService.sign({ userId: user._id }, { secret: jwtConstants.secret });

    return { token };
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async generateResetToken(login: string): Promise<string> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return null;
    }

    // Generate reset token
    const resetToken = await this.jwtService.sign(
      { userId: user._id },
      { secret: jwtConstants.secret, expiresIn: '1h' }, 
    );
    // Send the email with the reset token
    await this.sendResetEmail(user.login, resetToken);

    return resetToken;
  }

  async sendResetEmail(login: string, resetToken: string): Promise<void> {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const request = this.mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: { Email: 'malek.zaidi@esprit.tn', Name: 'TNF SUPPORT TEAM' },
                To: [{ Email: login }],
                TemplateID: 5772460, // Use your template ID here
                TemplateLanguage: true,
                Variables: {
                    FullName: user.fullName,
                    ResetLink: `http://localhost:4200/reset-password?token=${resetToken}`
                }
            },
        ],
    });

    await request.catch(err => {
        console.error('Error sending email:', err);
        throw err;
    });
  }


  async resetPassword(resetToken: string, newPassword: string): Promise<boolean> {
    // Verify the JWT token
    const decodedToken = this.jwtService.decode(resetToken);

    if (!decodedToken || !decodedToken.userId) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const userId = decodedToken.userId;

    // Find user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user's password and clear the reset token
    user.password = newPassword;
    user.resetToken = null;
    await user.save();

    return true;
  }

  async sendDeactivationEmail(login: string): Promise<void> {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get the current date and time
    const deactivationTime = new Date().toLocaleString();

    const request = this.mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: 'malek.zaidi@esprit.tn', Name: 'TNF SUPPORT TEAM' },
          To: [{ Email: login }],
          TemplateID: 5772498, 
          TemplateLanguage: true,
          Variables: {
            DeactivationTime: deactivationTime,
          },
        },
      ],
    });

    await request.catch(err => {
      console.error('Error sending deactivation email:', err);
      throw err;
    });
  }


  async sendActivationEmail(login: string): Promise<void> {
    const request = this.mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: 'malek.zaidi@esprit.tn', Name: 'TNF SUPPORT TEAM' },
          To: [{ Email: login }],
          TemplateID: 5772507, 
          TemplateLanguage: true,
        },
      ],
    });

    await request.catch(err => {
      console.error('Error sending activation email:', err);
      throw err;
    });
  }
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
        const user = await UserModel.findById(userId);
  
        if (!user) {
            throw new NotFoundException('User not found');
        }
  
        // Verify if the current password matches
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid current password');
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
          throw new UnauthorizedException('The password must be at least 8 characters long and contain at least one letter and one number');
      }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update the user's password without validation
        await UserModel.updateOne({ _id: userId }, { password: hashedPassword }, { validateBeforeSave: false });
  
        console.log('Password changed successfully');
    } catch (error) {
        // Handle errors
        console.error('Error changing password:', error);
        throw new UnauthorizedException('Failed to change password');
    }
}

  
}
