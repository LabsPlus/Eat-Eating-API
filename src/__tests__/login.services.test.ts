// src/__tests__/loginServices.test.ts
import { LoginServices } from '../services/login.services';
import { LoginDALs } from '../database/data.access/login.dals';
import { EmailUtils } from '../utils/email.utils';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

jest.mock('../database/data_access/user');
jest.mock('../utils/email');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('loginServices', () => {
  let loginServices: LoginServices;

  beforeEach(() => {
    loginServices = new LoginServices();
  });

  describe('updatePassword', () => {
    it('should throw an error if the user does not exist', async () => {
      // Alterando o mock apenas para este teste
      jest
        .spyOn(LoginDALs.prototype, 'findLoginByToken')
        .mockResolvedValue(null);

      // Utilize uma função async para aguardar a execução da expectativa
      await expect(
        loginServices.updatePassword({
          newPassword: 'newPassword',
          token: 'nonexistentToken',
        }),
      ).rejects.toThrow('There is no user with this token');
    });
  });

  describe('forgotPassword', () => {
    it('should throw an error if the user does not exist', async () => {
      // Alterando o mock apenas para este teste
      jest
        .spyOn(LoginDALs.prototype, 'findLoginByEmail')
        .mockResolvedValue(null);

      // Utilize uma função async para aguardar a execução da expectativa
      await expect(
        loginServices.forgotPassword({
          email: 'nonexistent@example.com',
          ip: 'fake_ip',
        }),
      ).rejects.toThrow('User not found');
    });

    it('should throw an error if the email is not sent successfully', async () => {
      // Mock findUserByEmail to return a valid user
      LoginDALs.prototype.findLoginByEmail = jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      // Mock bcrypt.hash to return hashed reset token
      (hash as jest.Mock).mockResolvedValue('hashedResetToken');

      // Mock updateResetToken to return the updated user
      LoginDALs.prototype.updateResetToken = jest.fn().mockResolvedValue({
        id: 1,
        resetToken: 'hashedResetToken',
        resetTokenExpiry: new Date(Date.now() + 3600000),
      });
    });
  });
});
