import { expect } from 'chai';
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
    expect(controller).to.be.an('object');
  });

  describe('login', () => {
    it('should return 200 with token on successful login', async () => {
      const mockResult = { token: 'mockToken' };
      jest.spyOn(authService, 'login').mockResolvedValue(mockResult);

      const res = {
        status: () => res,
        json: (data: any) => {
          expect(data).to.deep.equal({ message: 'Login successful', token: 'mockToken' });
        },
      };

      await controller.login('testuser', 'password123', res);
    });

    it('should return 401 on unsuccessful login', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(null);

      const res = {
        status: () => res,
        json: (data: any) => {
          expect(data).to.deep.equal({ message: 'Unauthorized' });
        },
      };

      await controller.login('testuser', 'wrongpassword', res);
    });
  });

  // Other describe blocks and tests...

});
