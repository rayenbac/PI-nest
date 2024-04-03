// auth.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from 'src/user/entities/User.model';
import { jwtConstants } from '../entities/constants'; 
import * as mailjet from 'node-mailjet'; 

@Injectable()
export class AuthService {
  private readonly transporter;
  private readonly mailjetClient;


  constructor(private readonly jwtService: JwtService) {/*
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'skylar.kuphal8@ethereal.email',
        pass: 'MAfnbrKxWkmkKNrRjV',
      },
    });*/

    this.mailjetClient = mailjet.connect('f0d1f00135c86c5beb143f0052226895', '991d774ee912ba9666bfac369724ba27', {
      version: 'v3.1',
      perform_api_call: true,
    });
  }
  async login(login: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
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
    const request = this.mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: 'malek.zaidi@esprit.tn', Name: 'TNF SUPPORT TEAM' },
          To: [{ Email: login }],
          Subject: 'Password Reset',
          HTMLPart: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                  }
                  h1 {
                    text-align: center;
                    color: #333;
                  }
                  p {
                    margin-bottom: 20px;
                    color: #666;
                  }
                  .reset-link {
                    display: block;
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Password Reset</h1>
                  <p>Use the following link to reset your password:</p>
                  <a class="reset-link" href="http://localhost:4200/reset-password?token=${resetToken}">Reset Password</a>
                </div>
              </body>
            </html>
          `,
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
}