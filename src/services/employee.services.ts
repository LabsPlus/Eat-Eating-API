import {EmployeeDALs} from "../database/repositories/user.repositories/user.dals/employee.dals";
import {IUserData} from "../intefaces/user.interfaces";
import {PersonDALs} from "../database/repositories/person.dals";
import {CategoryDALs} from "../database/repositories/user.repositories/user.dals/category.dals";
import {TypeGrantDALs} from "../database/repositories/user.repositories/user.dals/typeGrant.dals";
import {UserDALs} from "../database/repositories/user.repositories/user.dals/user.dals";
import {BadRequestError} from "../helpers/errors.helpers";

class EmployeeService {

    private readonly employeeDALs: EmployeeDALs;
    private readonly personRepositories: PersonDALs;
    private readonly categoryDALs: CategoryDALs;
    private readonly typeGrantDALs: TypeGrantDALs;
    private readonly userDALs: UserDALs;

    constructor() {
        this.employeeDALs = new EmployeeDALs();
        this.personRepositories = new PersonDALs();
        this.categoryDALs = new CategoryDALs();
        this.typeGrantDALs = new TypeGrantDALs();
        this.userDALs = new UserDALs();
    }

    async createEmployee({name, category, dailyMeals, typeGrant, picture, enrollment}: IUserData) {
        const createPerson = await this.personRepositories.createPerson(name);
        const getCategory = await this.categoryDALs.getCategoryByName(category);
        const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);

        if (!getCategory || !getTypeGrant) {
            throw new Error('Category or Type Grant not found')
        }

        const createUser = await this.userDALs.createUser({
            categoryId: getCategory.id,
            typeGrantId: getTypeGrant.id,
            personId: createPerson.id
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
            createPerson: createPerson.name,
            getCategory: getCategory.name,
            getTypeGrant: getTypeGrant.name,
        }
    }

    async listAllEmployees() {
        const employees = await this.employeeDALs.listAllEmployees();
        return employees;
    }

    async getEmployeeByEnrollment(enrollment: string) {
        const employee = await this.employeeDALs.getEmployeeByEnrollment(enrollment);
        return employee;
    }
}

export {EmployeeService};
