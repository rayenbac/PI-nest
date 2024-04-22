import { expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserModel } from '../entities/User.model';
import mongoose, { Promise } from 'mongoose';

// Mocking UserModel for testing purposes
const mockUserModel = {
  fullName: 'Test User',
  login: 'testuser',
  password: 'hashedPassword',
  role: 'admin',
  company: new mongoose.Types.ObjectId(),
  isActive: true,
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel, // Mock your UserModel if needed
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).to.be.an('object');
  });

  describe('login', () => {
    it('should return a token if login and password are correct', async () => {
      jest.spyOn(service, 'sendResetEmail').mockResolvedValue(undefined);
      jest.spyOn(service, 'validateUser').mockResolvedValue(Promise.resolve(mockUserModel));
      jest.spyOn(jwtService, 'sign').mockReturnValue('sampletoken');

      const token = await service.login('testuser', 'password123');

      expect(token).to.deep.equal({ token: 'sampletoken' });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      try {
        await service.login('nonexistentuser', 'password123');
      } catch (error) {
        expect(error).to.be.an.instanceOf(UnauthorizedException);
      }
    });

    it('should throw UnauthorizedException if user is not active', async () => {
      mockUserModel.isActive = false;
      jest.spyOn(service, 'validateUser').mockResolvedValue(Promise.resolve(mockUserModel));

      try {
        await service.login('testuser', 'password123');
      } catch (error) {
        expect(error).to.be.an.instanceOf(UnauthorizedException);
      }
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockUserModel.password = await bcrypt.hash('password123', 10);
      jest.spyOn(service, 'validateUser').mockResolvedValue(Promise.resolve(mockUserModel));
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      try {
        await service.login('testuser', 'wrongpassword');
      } catch (error) {
        expect(error).to.be.an.instanceOf(UnauthorizedException);
      }
    });
  });

  // Other describe blocks and tests...

});
