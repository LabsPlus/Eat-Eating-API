import { EmployeeService } from '../services/employee.services';
import { EmployeeDALs } from "../database/repositories/user.repositories/user.dals/employee.dals";
import { PersonDALs } from "../database/repositories/person.dals";
import { CategoryDALs } from "../database/repositories/user.repositories/user.dals/category.dals";
import { TypeGrantDALs } from "../database/repositories/user.repositories/user.dals/typeGrant.dals";
import { UserDALs } from "../database/repositories/user.repositories/user.dals/user.dals";
import { IUserDataCreate } from '../intefaces/user.interfaces';
import { EnrollmentDALs } from '../database/repositories/user.repositories/user.dals/enrollment.dals';

jest.mock('../database/repositories/user.repositories/user.dals/employee.dals');
jest.mock('../database/repositories/person.dals');
jest.mock('../database/repositories/user.repositories/user.dals/category.dals');
jest.mock('../database/repositories/user.repositories/user.dals/typeGrant.dals');
jest.mock('../database/repositories/user.repositories/user.dals/user.dals');

describe('EmployeeService', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should create an employee successfully', async () => {
        const mockEmployeeData: IUserDataCreate = {
             name: 'John Doe',
            category: 'ALUNO',
            enrollment: '12345',
            dailyMeals: 3,
            typeGrant: 'PARCIAL',
            picture: 'path/to/picture.jpg',
             email: 'www.teste@gmail.com',
            password: 'Gateeqsa23!',
            emailRecovery: 'www.teste@gmail.com'
        };

        jest.spyOn(PersonDALs.prototype, 'createPerson').mockResolvedValue({ id: 1, name: mockEmployeeData.name, cpf: '85984846527', born: new Date()});
        jest.spyOn(CategoryDALs.prototype, 'getCategoryByName').mockResolvedValue({
            id: 1,
            name: mockEmployeeData.category
        });
        jest.spyOn(TypeGrantDALs.prototype, 'getTypeGrantByName').mockResolvedValue({
            id: 1,
            name: mockEmployeeData.typeGrant
        });
        jest.spyOn(UserDALs.prototype, 'createUser').mockResolvedValue({
            id: 1,
            categoryId: 1,
            typeGrantId: 1,
            personId: 1,
            loginUserId: 1,
            dailyMeals: mockEmployeeData.dailyMeals
        });
        jest.spyOn(EnrollmentDALs.prototype, 'checkEnrollmentUnique').mockResolvedValue(true);
        jest.spyOn(EmployeeDALs.prototype, 'createEmployee').mockResolvedValue({
            id: 1,
            userId: 1,
            enrollmentId: 1,
        });

        const result = await service.createEmployee(mockEmployeeData);

        expect(result).toEqual({
            id: 1,
            userId: 1,
            employeesEnrollment: mockEmployeeData.enrollment,
            personName: mockEmployeeData.name,
            categoryName: mockEmployeeData.category,
            typeGrantName: mockEmployeeData.typeGrant,
            dailyMeals: mockEmployeeData.dailyMeals
        });
    });
});
