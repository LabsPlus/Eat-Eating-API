// Import necessary dependencies and the StudentService class
import { StudentService } from '../services/student.services'
import { NotFoundError } from '../helpers/errors.helpers';

// Mock the dependencies to isolate the tests
jest.mock('../database/repositories/user.repositories/user.dals/student.dals');
jest.mock('../database/repositories/person.dals');
jest.mock('../database/repositories/user.repositories/user.dals/category.dals');
jest.mock('../database/repositories/user.repositories/user.dals/typeGrant.dals');
jest.mock('../database/repositories/user.repositories/user.dals/user.dals');

describe('StudentService', () => {
  let studentService;

  beforeEach(() => {
    studentService = new StudentService();
  });

  it('should create a student successfully', async () => {
    // Mock the necessary methods for a successful creation
    studentService.personRepositories.createPerson.mockResolvedValue({ id: 1, name: 'John Doe' });
    studentService.categoryDALs.getCategoryByName.mockResolvedValue({ id: 1, name: 'Science' });
    studentService.typeGrantDALs.getTypeGrantByName.mockResolvedValue({ id: 1, name: 'Full Grant' });
    studentService.userDALs.createUser.mockResolvedValue({ id: 1 });
    studentService.studentDALs.createStudent.mockResolvedValue({ id: 1, enrollment: '12345' });

    const userData = {
      name: 'John Doe',
      category: 'Science',
      enrollment: '12345',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
    };

    const result = await studentService.createStudent(userData);

    expect(result).toEqual({
      id: 1,
      studentId: 1,
      enrollment: '12345',
      personName: 'John Doe',
      categoryName: 'Science',
      typeGrantName: 'Full Grant',
    });
  });

  it('should throw NotFoundError if enrollment is undefined', async () => {
    const userData = {
      name: 'John Doe',
      category: 'Science',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(NotFoundError);
    expect(studentService.userDALs.createUser).not.toHaveBeenCalled();
  });

  it('should throw NotFoundError if Category or Type Grant not found', async () => {
    // Mock only the necessary methods to simulate Category not found scenario
    studentService.personRepositories.createPerson.mockResolvedValue({ id: 1, name: 'John Doe' });
    studentService.categoryDALs.getCategoryByName.mockResolvedValue(null);
    studentService.typeGrantDALs.getTypeGrantByName.mockResolvedValue({ id: 1, name: 'Full Grant' });

    const userData = {
      name: 'John Doe',
      category: 'Science',
      enrollment: '12345',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(NotFoundError);
    expect(studentService.userDALs.createUser).not.toHaveBeenCalled();
  });
});
