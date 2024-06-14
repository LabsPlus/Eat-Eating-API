import { UserServices } from '../services/user.services';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { VerifyHelpers } from '../helpers/verify.helpers';
import { LoginDALs } from '../database/repositories/user.repositories/user.dals/login.dals';
import {
  UnprocessedEntityError,
  NotFoundError,
  BadRequestError,
} from '../helpers/errors.helpers';
import { IUserDataUpdate } from '../intefaces/user.interfaces';

import { hash } from 'bcrypt';

jest.mock('../database/repositories/user.repositories/user.dals/user.dals');
jest.mock('../database/repositories/user.repositories/user.dals/category.dals');
jest.mock('../database/repositories/user.repositories/user.dals/typeGrant.dals');
jest.mock('../helpers/verify.helpers');
jest.mock('../database/repositories/user.repositories/user.dals/login.dals');

describe('UserServices - updateAnUser', () => {
  let userServices: UserServices;
  let userDALsMock: jest.Mocked<UserDALs>;
  let categoryDALsMock: jest.Mocked<CategoryDALs>;
  let typeGrantDALsMock: jest.Mocked<TypeGrantDALs>;
  let verifyHelpersMock: jest.Mocked<VerifyHelpers>;
  let loginDALsMock: jest.Mocked<LoginDALs>;

  beforeEach(() => {
    userDALsMock = new UserDALs() as jest.Mocked<UserDALs>;
    categoryDALsMock = new CategoryDALs() as jest.Mocked<CategoryDALs>;
    typeGrantDALsMock = new TypeGrantDALs() as jest.Mocked<TypeGrantDALs>;
    verifyHelpersMock = new VerifyHelpers() as jest.Mocked<VerifyHelpers>;
    loginDALsMock = new LoginDALs() as jest.Mocked<LoginDALs>;

    userServices = new UserServices();
    userServices.userDALs = userDALsMock;
    userServices.categoryDALs = categoryDALsMock;
    userServices.typeGrantDALs = typeGrantDALsMock;
    userServices.verifyHelpers = verifyHelpersMock;
    userServices.loginDALs = loginDALsMock;
  });

  test('should update an existing user with emailRecovery and password', async () => {
    

    categoryDALsMock.getCategoryById.mockResolvedValue({
      id: 1,
      name: 'FUNCIONARIO',
    });

    categoryDALsMock.getCategoryByName.mockResolvedValue({
      id: 2,
      name: 'ALUNO',
    });

    typeGrantDALsMock.getTypeGrantByName.mockResolvedValue({
      id: 1,
      name: 'PARCIAL',
    });

    verifyHelpersMock.verifyUpdateByCategory.mockResolvedValue('ExpectedValue');

    const userData: IUserDataUpdate = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 2,
      typeGrant: 'INTEGRAL',
      email: 'www.bruno@gmail.com',
      picture: 'profile.jpg',
      enrollment: '12345',
      emailRecovery: 'recovery@example.com',
      password: 'newpassword',
    };
    const userId = 1;


    const result = await userServices.updateAnUser(userData, userId);

    expect(result).toEqual({
      id: 1,
      enrollment: '12345',
      personName: 'John Doe',
      categoryName: 'NewCategory',
      typeGrantName: 'TypeGrant',
      dailyMeals: 2,
      loginData: {
        email: 'updated@example.com',
        emailRecovery: 'recovery@example.com',
      },
    });

  });

  test('should throw UnprocessedEntityError for invalid dailyMeals', async () => {
    const userData: IUserDataUpdate = {
      name: 'John Doe',
      category: 'ALUNO',
      dailyMeals: 0,
      email: 'www.bruno@gmail.com',
      typeGrant: 'PARCIAL',
      picture: 'profile.jpg',
      enrollment: '12345',
      emailRecovery: 'recovery@example.com',
      password: 'newpassword',
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(UnprocessedEntityError);
  });

  test('should throw NotFoundError if user not found', async () => {
    userDALsMock.existsUserById.mockResolvedValue(null);

    const userData: IUserDataUpdate = {
      name: 'John Doe',
      category: 'ALUNO',
      dailyMeals: 2,
      email: 'www.bruno@gmail.com',
      typeGrant: 'INTEGRAL',
      picture: 'profile.jpg',
      enrollment: '12345',
      emailRecovery: 'recovery@example.com',
      password: 'newpassword',
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(NotFoundError);
  });
});
