import {EmployeeDALs} from "../database/repositories/user.repositories/user.dals/employee.dals";
import { VisitorDALs } from '../database/repositories/user.repositories/user.dals/visitor.dals';
import { StudentDALs } from "../database/repositories/user.repositories/user.dals/student.dals";
import {IUserData} from "../intefaces/user.interfaces";
import {PersonDALs} from "../database/repositories/person.dals";
import {CategoryDALs} from "../database/repositories/user.repositories/user.dals/category.dals";
import {TypeGrantDALs} from "../database/repositories/user.repositories/user.dals/typeGrant.dals";
import {UserDALs} from "../database/repositories/user.repositories/user.dals/user.dals";
import {BadRequestError, NotFoundError, UnprocessedEntityError} from "../helpers/errors.helpers";
import { IVerifyUpdateByCategory } from "../intefaces/verify.interfaces";

class EmployeeService {

    private readonly employeeDALs: EmployeeDALs;
    private readonly personRepositories: PersonDALs;
    private readonly categoryDALs: CategoryDALs;
    private readonly typeGrantDALs: TypeGrantDALs;
    private readonly userDALs: UserDALs;
    private readonly visitorDALs: VisitorDALs;
    private readonly studentDALs: StudentDALs;


    constructor() {
        this.employeeDALs = new EmployeeDALs();
        this.personRepositories = new PersonDALs();
        this.categoryDALs = new CategoryDALs();
        this.typeGrantDALs = new TypeGrantDALs();
        this.userDALs = new UserDALs();
         this.visitorDALs = new VisitorDALs();
         this.studentDALs = new StudentDALs();
    }

    async createEmployee({name, category, dailyMeals, typeGrant, picture, enrollment}: IUserData) {
        if (dailyMeals < 1 || dailyMeals > 3) {
            throw new UnprocessedEntityError({message: "Daily meals must be between 1 and 3"});
        }
        const createPerson = await this.personRepositories.createPerson(name);
        const getCategory = await this.categoryDALs.getCategoryByName(category);
        const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);

        if (!getCategory || !getTypeGrant) {
            throw new NotFoundError({message: 'Category or Type Grant not found'});
        }

        const createUser = await this.userDALs.createUser({
            categoryId: getCategory.id,
            typeGrantId: getTypeGrant.id,
            personId: createPerson.id,
            dailyMeals: dailyMeals
        });

        if (!enrollment) {
            throw new Error('Enrollment is required');
        }

        const isEnrollmentUnique = await this.employeeDALs.checkEnrollmentUnique(enrollment);

        if (!isEnrollmentUnique) {
            throw new BadRequestError({message: 'Enrollment already exists, only one enrollment is allowed.'});
        }

        const employees = await this.employeeDALs.createEmployee({
            userId: createUser.id,
            enrollment: enrollment,
        });

        return {
            id: employees.id,
            userId: createUser.id,
            employeesEnrollment: employees.enrollment,
            personName: createPerson.name,
            categoryName: getCategory.name,
            typeGrantName: getTypeGrant.name,
            dailyMeals: dailyMeals
        }
    }
    async updatetoEmployee({
    userId,
    oldCategory,
    enrollment,
  }: IVerifyUpdateByCategory) {
    switch (oldCategory) {
      case 'ESTUDANTE':
        await this.studentDALs.deleteByUserId(userId); 
        return await this.employeeDALs.createEmployee({ userId, enrollment });
      case 'VISITANTE':
        await this.visitorDALs.deleteByUserId(userId);
        return await this.employeeDALs.createEmployee({ userId, enrollment }); 
      default:
        throw new BadRequestError({ message: 'Old Category NotFound' });
    }
  }
}

export {EmployeeService};
