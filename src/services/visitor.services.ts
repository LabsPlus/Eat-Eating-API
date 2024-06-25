import { VisitorDALs } from '../database/repositories/user.repositories/user.dals/visitor.dals';
import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { EmployeeDALs } from '../database/repositories/user.repositories/user.dals/employee.dals';
import { PersonDALs } from '../database/repositories/person.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { IUserData, IUserDataCreate } from '../intefaces/user.interfaces';
import { EnrollmentDALs } from '../database/repositories/user.repositories/user.dals/enrollment.dals';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';
import { IVerifyUpdateByCategory } from '../intefaces/verify.interfaces';
import { LoginDALs } from '../database/repositories/user.repositories/user.dals/login.dals';
import { ILoginCreate } from '../intefaces/login.interfaces';
import { hash } from 'bcrypt';
// import { VerifyHelpers } from '../helpers/verify.helpers';
import { EmailValidator } from '../helpers/validators/email.validators';
import { PictureDALs } from '../database/repositories/user.repositories/user.dals/picture.dals';
import e from 'express';

class VisitorService {
  private readonly visitorDALs: VisitorDALs;
  private readonly loginDALs: LoginDALs;
  private readonly personRepositories: PersonDALs;
  private readonly categoryDALs: CategoryDALs;
  private readonly typeGrantDALs: TypeGrantDALs;
  private readonly userDALs: UserDALs;
  private readonly studentDALs: StudentDALs;
  private readonly employeeDALs: EmployeeDALs;
  private readonly enrollmentDALs: EnrollmentDALs;
  private readonly pictureDALs: PictureDALs;
  // private readonly verifyHelpers: VerifyHelpers;
  private readonly emailValidator: EmailValidator;

  constructor() {
    this.visitorDALs = new VisitorDALs();
    this.loginDALs = new LoginDALs();
    this.personRepositories = new PersonDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.userDALs = new UserDALs();
    this.studentDALs = new StudentDALs();
    this.employeeDALs = new EmployeeDALs();
    this.enrollmentDALs = new EnrollmentDALs();
    this.pictureDALs = new PictureDALs();
    // this.verifyHelpers = new VerifyHelpers();
    this.emailValidator = new EmailValidator();
  }

  async createVisitor({
    name,
    category,
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
    const loginByEmail = await this.loginDALs.findLoginByEmailOREmailRecovery({
      email,
      emailRecovery,
    });

        if (
      !( this.emailValidator.isValid(email)) ||
      !( this.emailValidator.isValid(emailRecovery))
    ) {
      throw new BadRequestError({ message: 'Invalid email format.' });
    }
    if (loginByEmail) {
      throw new BadRequestError({
        message:
          'Email or Email Recovery already exists, only one email is allowed.',
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
    let url = '';

    if (picture) {
      url = picture;
    }
    const existPicture = await this.pictureDALs.findPictureByUrl(url);
    if (existPicture.length !== 0 && url !== '') {
      throw new BadRequestError({ message: 'existPicture already exists' });
    }

    const createPicture = await this.pictureDALs.createPicture({
      url: url,
      userId: createUser.id,
    });
    const visitors = await this.visitorDALs.createVisitor(createUser.id);

    return {
      visitorId: visitors.id,
      personName: createPerson.name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      dailyMeals: dailyMeals,
      picture: createPicture.url,
      loginData: {
        email: createLogin.email,
        emailRecovery: createLogin.emailRecovery,
      },
    };
  }

  async updatetoVisitor({ userId, oldCategory }: IVerifyUpdateByCategory) {
    let result;
    switch (oldCategory) {
      case 'FUNCIONARIO':
        const employee = await this.employeeDALs.deleteByUserId(userId);
        await this.enrollmentDALs.deleteEnrollmentById(employee.enrollmentId);
        return await this.visitorDALs.createVisitor(userId);
      case 'ALUNO':
        const student = await this.studentDALs.deleteByUserId(userId);
        await this.enrollmentDALs.deleteEnrollmentById(student.enrollmentId);
        return await this.visitorDALs.createVisitor(userId);
      case 'VISITANTE':
        return await this.visitorDALs.findVisitorByUserId(userId);
      default:
        throw new BadRequestError({ message: 'Old Category NotFound' });
    }
  }
}

export { VisitorService };
