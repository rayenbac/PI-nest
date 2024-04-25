<<<<<<< HEAD
=======
import { expect } from 'chai';
>>>>>>> origin/master
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { AuthGuard } from '../entities/jwt-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {}, // Mock your UserModel if needed
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
<<<<<<< HEAD
    expect(controller).toBeDefined();
=======
    expect(controller).to.be.an('object');
>>>>>>> origin/master
  });

  describe('login', () => {
    it('should return 200 with token on successful login', async () => {
      const mockResult = { token: 'mockToken' };
      jest.spyOn(authService, 'login').mockResolvedValue(mockResult);

      const res = {
<<<<<<< HEAD
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.login('testuser', 'password123', res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: 'mockToken' });
=======
        status: () => res,
        json: (data: any) => {
          expect(data).to.deep.equal({ message: 'Login successful', token: 'mockToken' });
        },
      };

      await controller.login('testuser', 'password123', res);
>>>>>>> origin/master
    });

    it('should return 401 on unsuccessful login', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(null);

      const res = {
<<<<<<< HEAD
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.login('testuser', 'wrongpassword', res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });

  describe('forgotPassword', () => {
    it('should return 200 with message on successful generation of reset token', async () => {
      jest.spyOn(authService, 'generateResetToken').mockResolvedValue('mockResetToken');

      const result = await controller.forgotPassword('testuser');

      expect(result).toEqual({ statusCode: 200, message: 'Reset token generated successfully' });
    });
  });

  describe('resetPassword', () => {
    it('should return 200 with message on successful password reset', async () => {
      jest.spyOn(authService, 'resetPassword').mockResolvedValue(true);

      const result = await controller.resetPassword('mockResetToken', 'newpassword');

      expect(result).toEqual({ statusCode: 200, message: 'Password reset successful' });
    });

    it('should return 401 on unsuccessful password reset', async () => {
      jest.spyOn(authService, 'resetPassword').mockResolvedValue(false);

      const result = await controller.resetPassword('invalidResetToken', 'newpassword');

      expect(result).toEqual({ statusCode: 401, message: 'Invalid or expired reset token' });
    });
  });

  describe('getProfile', () => {
    it('should return user data', () => {
      const mockUser = { userId: '123', username: 'testuser' };
      const req = { user: mockUser };

      const result = controller.getProfile(req);

      expect(result).toEqual(mockUser);
    });
  });
=======
        status: () => res,
        json: (data: any) => {
          expect(data).to.deep.equal({ message: 'Unauthorized' });
        },
      };

      await controller.login('testuser', 'wrongpassword', res);
    });
  });

  // Other describe blocks and tests...

>>>>>>> origin/master
});
