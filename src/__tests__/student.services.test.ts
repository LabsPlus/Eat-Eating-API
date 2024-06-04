import { StudentService } from '../services/student.services';
import {
    BadRequestError,
    NotFoundError,
    UnprocessedEntityError,
} from '../helpers/errors.helpers';
import { PersonDALs } from '../database/repositories/person.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { EnrollmentDALs } from '../database/repositories/user.repositories/user.dals/enrollment.dals';
import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { IUserCreate, IUserData, IUserDataCreate } from '../intefaces/user.interfaces';

jest.mock('../database/repositories/user.repositories/user.dals/student.dals');
jest.mock('../database/repositories/person.dals');
jest.mock('../database/repositories/user.repositories/user.dals/category.dals');
jest.mock('../database/repositories/user.repositories/user.dals/typeGrant.dals');
jest.mock('../database/repositories/user.repositories/user.dals/user.dals');

describe('StudentService', () => {
    let studentService: StudentService;

    beforeEach(() => {
        studentService = new StudentService();
    });

    it('should create a student successfully', async () => {
        jest.spyOn(PersonDALs.prototype, 'createPerson').mockResolvedValue({
            id: 1,
            name: 'John Doe',
            cpf: '85984846527',
            born: new Date('2001-10-20')
        });
        jest.spyOn(CategoryDALs.prototype, 'getCategoryByName').mockResolvedValue({
            id: 1,
            name: 'ALUNO',
        });
        jest.spyOn(TypeGrantDALs.prototype, 'getTypeGrantByName').mockResolvedValue({
            id: 1,
            name: 'PARCIAL',
        });
        jest.spyOn(UserDALs.prototype, 'createUser').mockResolvedValue({ id: 1, personId: 1, loginUserId: 1, categoryId: 1, typeGrantId: 1, dailyMeals: 2 });
        jest.spyOn(EnrollmentDALs.prototype, 'checkEnrollmentUnique').mockResolvedValue(true);
        jest.spyOn(StudentDALs.prototype, 'createStudent').mockResolvedValue({
            id: 1,
            userId: 1,
            courseId: 1,
            enrollmentId: 1
        });

        const userData: IUserDataCreate = {
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

        const result = await studentService.createStudent(userData);

        expect(result).toEqual({
            id: 1,
            studentId: 1,
            enrollment: '12345',
            personName: 'John Doe',
            categoryName: 'Science',
            typeGrantName: 'Full Grant',
            dailyMeals: 3,
        });
    });

    it('should throw UnprocessedEntityError if dailyMeals is not between 1 and 3', async () => {
        const userData: IUserDataCreate = {
            name: 'John Doe',
            category: 'ALUNO',
            enrollment: '12345',
            dailyMeals: 4,
            typeGrant: 'PARCIAL',
            picture: 'path/to/picture.jpg',
            email: 'www.teste@gmail.com',
            password: 'Gateeqsa23!',
            emailRecovery: 'www.teste@gmail.com'
            
        };

        await expect(studentService.createStudent(userData)).rejects.toThrow(UnprocessedEntityError);
             const createUserSpy = jest.spyOn(UserDALs.prototype, 'createUser');
        expect(createUserSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if enrollment is not provided', async () => {
        const userData: IUserDataCreate = {
            name: 'John Doe',
            category: 'ALUNO',
            dailyMeals: 3,
            typeGrant: 'PARCIAL',
            picture: 'path/to/picture.jpg',
            email: 'www.teste@gmail.com',
            password: 'Gateeqsa23!',
            emailRecovery: 'www.teste@gmail.com'
        };

        await expect(studentService.createStudent(userData)).rejects.toThrow(BadRequestError);
        // Mock and spy on the method
        const createUserSpy = jest.spyOn(UserDALs.prototype, 'createUser');
        expect(createUserSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if enrollment is not unique', async () => {
        jest.spyOn(PersonDALs.prototype, 'createPerson').mockResolvedValue({
            id: 1,
            name: 'John Doe',
            cpf: '85984846527',
            born: new Date(),
        });
        jest.spyOn(CategoryDALs.prototype, 'getCategoryByName').mockResolvedValue({
            id: 1,
            name: 'ALUNO',
        });
        jest.spyOn(TypeGrantDALs.prototype, 'getTypeGrantByName').mockResolvedValue({
            id: 1,
            name: 'PARCIAL',
        });
        jest.spyOn(UserDALs.prototype, 'createUser').mockResolvedValue({ id: 1, personId: 1, loginUserId: 1, categoryId: 1, typeGrantId: 1, dailyMeals: 1 });
        jest.spyOn(EnrollmentDALs.prototype, 'checkEnrollmentUnique').mockResolvedValue(false);

        const userData: IUserDataCreate = {
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

        await expect(studentService.createStudent(userData)).rejects.toThrow(BadRequestError);
    });

    it('should handle database error when creating person', async () => {
        jest.spyOn(PersonDALs.prototype, 'createPerson').mockRejectedValue(new Error('Database Error'));

        const userData: IUserDataCreate = {
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

        await expect(studentService.createStudent(userData)).rejects.toThrow(Error);
        const createPersonSpy = jest.spyOn(PersonDALs.prototype, 'createPerson');
        expect(createPersonSpy).toHaveBeenCalled();
    });

    it('should handle database error when creating user', async () => {
        jest.spyOn(PersonDALs.prototype, 'createPerson').mockResolvedValue({
            id: 1,
            name: 'John Doe',
            cpf: '85984846527',
            born: new Date()
        });
        jest.spyOn(CategoryDALs.prototype, 'getCategoryByName').mockResolvedValue({
            id: 1,
            name: 'ALUNO',
        });
        jest.spyOn(TypeGrantDALs.prototype, 'getTypeGrantByName').mockResolvedValue({
            id: 1,
            name: 'PARCIAL',
        });
        jest.spyOn(UserDALs.prototype, 'createUser').mockRejectedValue(new Error('Database Error'));

        const userData: IUserDataCreate = {
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

        await expect(studentService.createStudent(userData)).rejects.toThrow(Error);
        const createUserSpy = jest.spyOn(UserDALs.prototype, 'createUser');
        expect(createUserSpy).toHaveBeenCalled();
    });
});