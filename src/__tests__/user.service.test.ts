import { UserServices } from '../services/user.services';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { VerifyHelpers } from '../helpers/verify.helpers';
import {
  UnprocessedEntityError,
  NotFoundError,
  BadRequestError,
} from '../helpers/errors.helpers';
import { IUserData } from '../intefaces/user.interfaces';

jest.mock('../database/repositories/user.repositories/user.dals/user.dals');
jest.mock('../database/repositories/user.repositories/user.dals/category.dals');
jest.mock('../database/repositories/user.repositories/user.dals/typeGrant.dals');
jest.mock('../helpers/verify.helpers');

describe('UserServices - updateAnUser', () => {
  let userServices: UserServices;
  let userDALsMock: jest.Mocked<UserDALs>;
  let categoryDALsMock: jest.Mocked<CategoryDALs>;
  let typeGrantDALsMock: jest.Mocked<TypeGrantDALs>;
  let verifyHelpersMock: jest.Mocked<VerifyHelpers>;

  beforeEach(() => {
    userDALsMock = new UserDALs() as jest.Mocked<UserDALs>;
    categoryDALsMock = new CategoryDALs() as jest.Mocked<CategoryDALs>;
    typeGrantDALsMock = new TypeGrantDALs() as jest.Mocked<TypeGrantDALs>;
    verifyHelpersMock = new VerifyHelpers() as jest.Mocked<VerifyHelpers>;

    userServices = new UserServices();
    userServices.userDALs = userDALsMock;
    userServices.categoryDALs = categoryDALsMock;
    userServices.typeGrantDALs = typeGrantDALsMock;
    userServices.verifyHelpers = verifyHelpersMock;
  });

  test('should update an existing user', async () => {
    // Mocking necessary dependencies and setting up necessary data
    

    categoryDALsMock.getCategoryById.mockResolvedValue({
      id: 1,
      name: 'ESTUDANTE',
    });

    categoryDALsMock.getCategoryByName.mockResolvedValue({
      id: 2,
      name: 'FUNCIONARIO',
    });

    typeGrantDALsMock.getTypeGrantByName.mockResolvedValue({
      id: 1,
      name: 'INTEGRAL',
    });

    verifyHelpersMock.verifyUpdateByCategory.mockResolvedValue('ExpectedValue');

    // Test data
    const userData: IUserData = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 2,
      typeGrant: 'INTEGRAL',
      picture: 'profile.jpg',
      enrollment: '12345',
    };
    const userId = 1;

    // Perform the update
    const result = await userServices.updateAnUser(userData, userId);

    // Assertions
    expect(result).toEqual({
      id: 1,
      enrollment: '12345',
      personName: 'John Doe',
      categoryName: 'FUNCIONARIO',
      typeGrantName: 'INTEGRAL',
      dailyMeals: 2,
    });

   
  });

  test('should throw UnprocessedEntityError for invalid dailyMeals', async () => {
    const userData: IUserData = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 0,
      typeGrant: 'INTEGRAL',
      picture: 'profile.jpg',
      enrollment: '12345',
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(UnprocessedEntityError);
  });

  test('should throw UnprocessedEntityError for invalid dailyMeals', async () => {
    const userData: IUserData = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 0,
      typeGrant: 'PARCIAL',
      picture: 'profile.jpg',
      enrollment: '12345',
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(UnprocessedEntityError);
  });

  test('should throw NotFoundError if enrollment is undefined', async () => {
    const userData: IUserData = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 2,
      typeGrant: 'PARCIAL',
      picture: 'profile.jpg',
      enrollment: undefined,
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(NotFoundError);
  });

  test('should throw BadRequestError if enrollment is not provided', async () => {
    const userData: IUserData = {
      name: 'John Doe',
      category: 'FUNCIONARIO',
      dailyMeals: 2,
      typeGrant: 'INTEGRAL',
      picture: 'profile.jpg',
      enrollment: "",
    };
    const userId = 1;

    await expect(
      userServices.updateAnUser(userData, userId)
    ).rejects.toThrowError(BadRequestError);
  });

});

