import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { VisitorDALs } from '../database/repositories/user.repositories/user.dals/visitor.dals';
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
import { hash } from 'bcrypt';
import { PictureDALs } from '../database/repositories/user.repositories/user.dals/picture.dals';

class StudentService {
  private readonly studentDALs: StudentDALs;
  private readonly loginDALs: LoginDALs;
  private readonly employeeDALs: EmployeeDALs;
  private readonly visitorDALs: VisitorDALs;
  private readonly personRepositories: PersonDALs;
  private readonly categoryDALs: CategoryDALs;
  private readonly typeGrantDALs: TypeGrantDALs;
  private readonly userDALs: UserDALs;
  private readonly enrollmentDALs: EnrollmentDALs;
  private readonly pictureDALs: PictureDALs;

  constructor() {
    this.studentDALs = new StudentDALs();
    this.loginDALs = new LoginDALs();
    this.personRepositories = new PersonDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.userDALs = new UserDALs();
    this.visitorDALs = new VisitorDALs();
    this.employeeDALs = new EmployeeDALs();
    this.enrollmentDALs = new EnrollmentDALs();
    this.pictureDALs = new PictureDALs();
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

    if (!enrollment) {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }
    const isEnrollmentUnique = await this.enrollmentDALs.checkEnrollmentUnique(
      enrollment,
    );

    if (!isEnrollmentUnique) {
      throw new BadRequestError({
        message: 'Enrollment already exists, only one enrollment is allowed.',
      });
    }
    const loginByEmail = await this.loginDALs.findLoginByEmail(email);

    if (loginByEmail) {
      throw new BadRequestError({
        message: 'email already exists, only one email is allowed.',
      });
    }
    const passwordHash = await hash(password, 10);

    const createLogin = await this.loginDALs.createLogin({
      email,
      emailRecovery,
      password: passwordHash,
    });

    const createPerson = await this.personRepositories.createPerson(name);
    const createEnrollment = await this.enrollmentDALs.createEnrollment(
      enrollment,
    );
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
     let url = "";

    if (picture) {
      url = picture;
    }

    const createPicture = await this.pictureDALs.createPicture({
      url: url,
      userId: createUser.id,
    });
    if (!enrollment) {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }

    const student = await this.studentDALs.createStudent({
      userId: createUser.id,
      enrollmentId: createEnrollment.id,
    });

    return {
      id: createUser.id,
      studentId: student.id,
      enrollment: student.enrollmentId,
      personName: createPerson.name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      picture: createPicture.url,
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
    category,
  }: IVerifyUpdateByCategory) {
    if (!enrollment) {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }
   
    switch (oldCategory) {
      case 'FUNCIONARIO':
        const oldEnrollmentEmployee = await this.employeeDALs.findEnrrolmentByUserId(
          userId,
        );
         if (!oldEnrollmentEmployee) {
          throw new BadRequestError({ message: 'OldEnrollment is required' });
        }
        
        if(oldEnrollmentEmployee.enrollment === enrollment){
             throw new UnprocessedEntityError({
            message: 'category cannot be update without enrrolment',
          }); 
        }
        const IsEnrrolmentUnique = this.enrollmentDALs.checkEnrollmentUnique(enrollment);
        if(!IsEnrrolmentUnique){
          throw new BadRequestError({
            message: 'Enrollment already exists, only one enrollment is allowed.',
          }); 
        }
        const employee = await this.employeeDALs.deleteByUserId(userId);
        const updateEnrollment = await this.enrollmentDALs.updateEnrollment(
          employee.enrollmentId,
          enrollment,
        );
        return await this.studentDALs.createStudent({
          userId,
          enrollmentId: updateEnrollment.id,
        });
      case 'VISITANTE':
        
        await this.visitorDALs.deleteByUserId(userId);
        const createEnrollment = await this.enrollmentDALs.createEnrollment(
          enrollment,
        );
        return await this.studentDALs.createStudent({
          userId,
          enrollmentId: createEnrollment.id,
        });

      case 'ALUNO':
        const oldEnrollmentStudent = await this.studentDALs.findEnrrolmentByUserId(
          userId,
        );
        
         if (!oldEnrollmentStudent) {
          throw new BadRequestError({ message: 'OldEnrollment is required' });
        }
      
       if (
            oldCategory !== category || oldEnrollmentStudent.enrollment !== enrollment
        ) {
          throw new UnprocessedEntityError({
            message: 'enrrolment cannot be update without category',
          });
          
        }
        return await this.studentDALs.findStudentByUserId( userId );
      default:
        throw new BadRequestError({ message: 'Old Category NotFound' });
    }
  }
}

export { StudentService };
