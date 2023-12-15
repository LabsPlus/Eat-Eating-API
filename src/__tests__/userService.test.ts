// src/__tests__/userServices.test.ts
import { UserServices } from '../services/user';
import { UserDAL } from '../database/data_access/user';
import { Email } from '../utils/email';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

jest.mock('../database/data_access/user');
jest.mock('../utils/email');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserServices', () => {
  let userServices: UserServices;

  beforeEach(() => {
    userServices = new UserServices();
  });

  describe('updatePassword', () => {
   

    it('should throw an error if the user does not exist', async () => {
      // Alterando o mock apenas para este teste
      jest.spyOn(UserDAL.prototype, 'findUserByToken').mockResolvedValue(null);

      // Utilize uma função async para aguardar a execução da expectativa
      await expect(
        userServices.updatePassword('newPassword', 'nonexistentToken'),
      ).rejects.toThrow('There is no user with this token');
    });

    
  });

  describe('forgotPassword', () => {
   

    it('should throw an error if the user does not exist', async () => {
      // Alterando o mock apenas para este teste
      jest.spyOn(UserDAL.prototype, 'findUserByEmail').mockResolvedValue(null);

      // Utilize uma função async para aguardar a execução da expectativa
      await expect(
        userServices.forgotPassword('nonexistent@example.com'),
      ).rejects.toThrow('User not found');
    });

    it('should throw an error if the email is not sent successfully', async () => {
      // Mock findUserByEmail to return a valid user
      UserDAL.prototype.findUserByEmail = jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      // Mock bcrypt.hash to return hashed reset token
      (hash as jest.Mock).mockResolvedValue('hashedResetToken');

      // Mock updateResetToken to return the updated user
      UserDAL.prototype.updateResetToken = jest.fn().mockResolvedValue({
        id: 1,
        resetToken: 'hashedResetToken',
        resetTokenExpiry: new Date(Date.now() + 3600000),
      });
    });
  });
});
