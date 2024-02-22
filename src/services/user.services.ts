import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import dotenv from 'dotenv';
import { IUserData, IUserDataUpdate } from '../intefaces/user.interfaces';
import { VerifyHelpers } from '../helpers/verify.helpers';
import { LoginDALs } from '../database/repositories/user.repositories/user.dals/login.dals';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';
import { hash } from 'bcrypt';
import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { EmployeeDALs } from '../database/repositories/user.repositories/user.dals/employee.dals';

dotenv.config();

const { Link } = process.env;

class UserServices {
  userDALs: UserDALs;
  categoryDALs: CategoryDALs;
  typeGrantDALs: TypeGrantDALs;
  verifyHelpers: VerifyHelpers;
  loginDALs: LoginDALs;
  employeeDALs: EmployeeDALs;
  studentDALs: StudentDALs;

  constructor() {
    this.userDALs = new UserDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.verifyHelpers = new VerifyHelpers();
    this.loginDALs = new LoginDALs();
    this.studentDALs = new StudentDALs();
    this.employeeDALs = new EmployeeDALs();
  }

  async updateAnUser(
    {
      name,
      category,
      dailyMeals,
      typeGrant,
      picture,
      enrollment,
      emailRecovery,
      password,
    }: IUserDataUpdate,
    id: number,
  ) {
    if (dailyMeals < 1 || dailyMeals > 3) {
      throw new UnprocessedEntityError({
        message: 'Daily meals must be between 1 and 3',
      });
    }
    const oldUser = await this.userDALs.existsUserById(id);
    if (!oldUser) {
      throw new NotFoundError({ message: 'User not Found!' });
    }
    const passwordHash = await hash(password, 10);
    const updateLogin = await this.loginDALs.updateLogin({
      id: oldUser.loginUserId!,
      emailRecovery: emailRecovery,
      password: passwordHash,
    });

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
    if (oldCategory.name === category) {
      throw new UnprocessedEntityError({
        message: 'enrrolment cannot be update without category',
      });
    }
    await this.verifyHelpers.verifyUpdateByCategory({
      userId: id,
      oldCategory: oldCategory.name,
      category: category,
      enrollment: enrollment,
    });

    return {
      id: updateUser.id,
      enrollment: enrollment,
      personName: name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      dailyMeals: dailyMeals,
      loginData: {
        email: updateLogin.email,
        emailRecovery: updateLogin.emailRecovery,
      },
    };
  }

  async listAllUsers() {
    const users = await this.userDALs.listAllUsers();
    const usersArray: { user: any; enrrolment: any }[] = [];
    await Promise.all(
      users.map(async (user) => {
        console.log(user);
        if (user.category?.name === 'ESTUDANTE') {
          const result = await this.studentDALs.findStudentByUserId(user.id);
          if (result && result.enrollment) {
          usersArray.push({ user: user, enrrolment: result!.enrollment });
          }
        }
        if (user.category?.name === 'FUNCIONARIO') {
          
          const result = await this.employeeDALs.findEmployeeByUserId(user.id);
          if (result && result.enrollment) {
              usersArray.push({ user: user, enrrolment: result!.enrollment });
          }
        }
        if (user.category?.name === 'VISITANTE') {
          usersArray.push({ user: user, enrrolment: '' });
        }
    
      }),
    );
    return usersArray;
  }

  async deleteById(id: number) {
    return this.userDALs.deleteUserById(id);
  }
}

export { UserServices };
