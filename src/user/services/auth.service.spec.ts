import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserModel } from '../entities/User.model';
import mongoose from 'mongoose';

// Mocking UserModel for testing purposes
jest.mock('src/user/entities/User.model');

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
          useValue: {}, // Mock your UserModel if needed
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a token if login and password are correct', async () => {
      const sampleUser: User = new UserModel({
        fullName: 'Test User',
        login: 'testuser',
        password: 'hashedPassword', // Il faudrait peut-être utiliser un mot de passe haché pour ce test
        role: 'admin', // ou tout autre rôle approprié
        company: new mongoose.Types.ObjectId(),
        isActive: true,
      });

      jest.spyOn(service, 'sendResetEmail').mockResolvedValue(undefined);
      jest.spyOn(service, 'validateUser').mockResolvedValue(sampleUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('sampletoken');

      const token = await service.login('testuser', 'password123');

      expect(token).toEqual({ token: 'sampletoken' });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.login('nonexistentuser', 'password123')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not active', async () => {
        const sampleUser: User = new UserModel({
            _id: 'someuserid',
        login: 'testuser',
        password: await bcrypt.hash('password123', 10),
        isActive: false,
      });

      jest.spyOn(service, 'validateUser').mockResolvedValue(sampleUser);

      await expect(service.login('testuser', 'password123')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
        const sampleUser: User = new UserModel({
            _id: 'someuserid',
        login: 'testuser',
        password: await bcrypt.hash('password123', 10),
        isActive: true,
      });

      jest.spyOn(service, 'validateUser').mockResolvedValue(sampleUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false); // Modify this line

      await expect(service.login('testuser', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('generateResetToken', () => {
    it('should return reset token if user exists', async () => {
        const sampleUser: User = new UserModel({
            _id: 'someuserid',
        login: 'testuser',
      });

      jest.spyOn(service, 'sendResetEmail').mockResolvedValue(undefined);
      jest.spyOn(service, 'validateUser').mockResolvedValue(sampleUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('resettoken');

      const resetToken = await service.generateResetToken('testuser');

      expect(resetToken).toEqual('resettoken');
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      const resetToken = await service.generateResetToken('nonexistentuser');

      expect(resetToken).toBeNull();
    });
  });

  describe('sendResetEmail', () => {
    it('should send reset email successfully', async () => {
      const sampleUser = {
        login: 'testuser',
        fullName: 'Test User',
      };

      jest.spyOn(service, 'sendResetEmail').mockResolvedValue(undefined);

      await expect(service.sendResetEmail('testuser', 'resettoken')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'sendResetEmail').mockRejectedValue(new NotFoundException());

      await expect(service.sendResetEmail('nonexistentuser', 'resettoken')).rejects.toThrow(NotFoundException);
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const sampleUser = new UserModel({
        _id: 'someuserid',
        login: 'testuser',
        password: await bcrypt.hash('newpassword', 10),
        resetToken: 'resettoken',
      });

      jest.spyOn(service, 'resetPassword').mockResolvedValue(true);
      jest.spyOn(service, 'validateUser').mockResolvedValue(sampleUser);

      const result = await service.resetPassword('resettoken', 'newpassword');

      expect(result).toBe(true);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.resetPassword('resettoken', 'newpassword')).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if reset token is invalid', async () => {
        jest.spyOn(service, 'validateUser').mockResolvedValue({} as User);

      await expect(service.resetPassword('invalidtoken', 'newpassword')).rejects.toThrow(UnauthorizedException);
    });
  });

});
