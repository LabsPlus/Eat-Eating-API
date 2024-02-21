import {EmployeeService} from '../services/employee.services';
import {EmployeeDALs} from "../database/repositories/user.repositories/user.dals/employee.dals";
import {PersonDALs} from "../database/repositories/person.dals";
import {CategoryDALs} from "../database/repositories/user.repositories/user.dals/category.dals";
import {TypeGrantDALs} from "../database/repositories/user.repositories/user.dals/typeGrant.dals";
import {UserDALs} from "../database/repositories/user.repositories/user.dals/user.dals";

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

    it('should throw an error if category or typeGrant is not found', async () => {
        const mockEmployeeData = {
            name: 'Test Name',
            category: 'Nonexistent Category',
            dailyMeals: 2,
            typeGrant: 'Nonexistent TypeGrant',
            picture: 'Test Picture',
            enrollment: 'Test Enrollment'
        };

        service.categoryDALs.getCategoryByName.bind(CategoryDALs);
        service.typeGrantDALs.getTypeGrantByName.bind(TypeGrantDALs);

        await expect(service.createEmployee(mockEmployeeData as any)).rejects.toThrow('Category or Type Grant not found');
    });
    it('should create an employee successfully', async () => {

        const mockEmployeeData = {
            name: 'Test Name',
            category: 'Test Category',
            dailyMeals: 2,
            typeGrant: 'Test TypeGrant',
            picture: 'Test Picture',
            enrollment: 'Test Enrollment'
        };

        (PersonDALs.prototype.createPerson as jest.Mock).mockResolvedValue({id: 1, name: mockEmployeeData.name});
        (CategoryDALs.prototype.getCategoryByName as jest.Mock).mockResolvedValue({
            id: 1,
            name: mockEmployeeData.category
        });
        (TypeGrantDALs.prototype.getTypeGrantByName as jest.Mock).mockResolvedValue({
            id: 1,
            name: mockEmployeeData.typeGrant
        });
        (UserDALs.prototype.createUser as jest.Mock).mockResolvedValue({
            id: 1,
            categoryId: 1,
            typeGrantId: 1,
            personId: 1,
            dailyMeals: mockEmployeeData.dailyMeals
        });
        (EmployeeDALs.prototype.checkEnrollmentUnique as jest.Mock).mockResolvedValue(true);
        (EmployeeDALs.prototype.createEmployee as jest.Mock).mockResolvedValue({
            id: 1,
            userId: 1,
            enrollment: mockEmployeeData.enrollment
        });

        const result = await service.createEmployee(mockEmployeeData as any);

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
