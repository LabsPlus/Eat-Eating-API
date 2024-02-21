import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import dotenv from 'dotenv';
import { IUserData } from '../intefaces/user.interfaces';
import { VerifyHelpers } from '../helpers/verify.helpers';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';

dotenv.config();

const { Link } = process.env;

class UserServices {
  userDALs: UserDALs;
  categoryDALs: CategoryDALs;
  typeGrantDALs: TypeGrantDALs;
  verifyHelpers: VerifyHelpers;
  constructor() {
    this.userDALs = new UserDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.verifyHelpers = new VerifyHelpers();
  }

  async updateAnUser(
    { name, category, dailyMeals, typeGrant, picture, enrollment }: IUserData,
    id: number,
  ) {
    if (dailyMeals < 1 || dailyMeals > 3) {
      throw new UnprocessedEntityError({
        message: 'Daily meals must be between 1 and 3',
      });
    }
    const oldUser = await this.userDALs.existsUserById(id);
    const oldCategory = await this.categoryDALs.getCategoryById(
      oldUser!.categoryId!,
    );
    const getCategory = await this.categoryDALs.getCategoryByName(category);
    const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);
    if (enrollment === undefined) {
      throw new NotFoundError({ message: 'Enrollment is undefined' });
    }
    if (getCategory === null || getTypeGrant === null) {
      throw new NotFoundError({ message: 'Category or Type Grant not found' });
    }

    const updateUser = await this.userDALs.updateUser({
      id: id,
      categoryId: getCategory.id,
      typeGrantId: getTypeGrant.id,
      name: name,
      dailyMeals: dailyMeals,
    });
    if (!enrollment) {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }

    if (oldCategory === null) {
      throw new NotFoundError({ message: 'old category not founded' });
    }
    if (oldCategory.name !== category) {
      await this.verifyHelpers.verifyUpdateByCategory({
        userId: id,
        oldCategory: oldCategory.name,
        category: category,
        enrollment: enrollment,
      });
    }

    return {
      id: updateUser.id,
      enrollment: enrollment,
      personName: name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      dailyMeals: dailyMeals,
    };
  }

  async listAllUsers() {
    return this.userDALs.listAllUsers();
  }

  async deleteById(id: number) {
    return this.userDALs.deleteUserById(id);
  }
}

export { UserServices };
