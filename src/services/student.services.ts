import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { VisitorDALs } from '../database/repositories/user.repositories/user.dals/visitor.dals';
import { EmployeeDALs } from '../database/repositories/user.repositories/user.dals/employee.dals';
import { PersonDALs } from '../database/repositories/person.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { IUserData, IUserDataCreate } from '../intefaces/user.interfaces';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';
import { IVerifyUpdateByCategory } from '../intefaces/verify.interfaces';
import { LoginDALs } from '../database/repositories/user.repositories/user.dals/login.dals';
import { hash } from 'bcrypt';

class StudentService {
  private readonly studentDALs: StudentDALs;
  private readonly loginDALs: LoginDALs;
  private readonly employeeDALs: EmployeeDALs;
  private readonly visitorDALs: VisitorDALs;
  private readonly personRepositories: PersonDALs;
  private readonly categoryDALs: CategoryDALs;
  private readonly typeGrantDALs: TypeGrantDALs;
  private readonly userDALs: UserDALs;

  constructor() {
    this.studentDALs = new StudentDALs();
    this.loginDALs = new LoginDALs();
    this.personRepositories = new PersonDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.userDALs = new UserDALs();
    this.visitorDALs = new VisitorDALs();
    this.employeeDALs = new EmployeeDALs();
  }

  async createStudent({
    name,
    category,
    enrollment,
    dailyMeals,
    typeGrant,
    picture,
    email,
    emailRecovery,
    password,
  }: IUserDataCreate) {
    if (dailyMeals < 1 || dailyMeals > 3) {
      throw new UnprocessedEntityError({
        message: 'Daily meals must be between 1 and 3',
      });
    }

    const passwordHash = await hash(password, 10);

    const createLogin = await this.loginDALs.createLogin({
      email,
      emailRecovery,
      password: passwordHash,
    });

    const createPerson = await this.personRepositories.createPerson(name);
    const getCategory = await this.categoryDALs.getCategoryByName(category);
    const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);
    if (enrollment === undefined) {
      throw new NotFoundError({ message: 'Enrollment is undefined' });
    }
    if (getCategory === null || getTypeGrant === null) {
      throw new NotFoundError({ message: 'Category or Type Grant not found' });
    }

    const createUser = await this.userDALs.createUser({
      categoryId: getCategory.id,
      typeGrantId: getTypeGrant.id,
      personId: createPerson.id,
      dailyMeals: dailyMeals,
      loginUserId: createLogin.id,
    });

    if (!enrollment) {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }

    const isEnrollmentUnique = await this.studentDALs.checkEnrollmentUnique(
      enrollment,
    );

    if (!isEnrollmentUnique) {
      throw new BadRequestError({
        message: 'Enrollment already exists, only one enrollment is allowed.',
      });
    }

    const student = await this.studentDALs.createStudent({
      userId: createUser.id,
      enrollment: enrollment,
    });

    return {
      id: createUser.id,
      studentId: student.id,
      enrollment: student.enrollment,
      personName: createPerson.name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      dailyMeals: dailyMeals,
      loginData: {
        email: createLogin.email,
        emailRecovery: createLogin.emailRecovery,
      },
    };
  }

  async updatetoStudent({
    userId,
    oldCategory,
    enrollment,
  }: IVerifyUpdateByCategory) {
    switch (oldCategory) {
      case 'FUNCIONARIO':
        await this.employeeDALs.deleteByUserId(userId);
        return await this.studentDALs.createStudent({ userId, enrollment });
      case 'VISITANTE':
        await this.visitorDALs.deleteByUserId(userId);
        return await this.studentDALs.createStudent({ userId, enrollment });
      default:
        throw new BadRequestError({ message: 'Old Category NotFound' });
    }
  }
}

export { StudentService };
