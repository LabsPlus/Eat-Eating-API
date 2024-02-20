import { StudentService } from '../services/student.services';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';

jest.mock(
  '../database/repositories/user.repositories/user.dals/student.dals',
);
jest.mock('../database/repositories/person.dals');
jest.mock(
  '../database/repositories/user.repositories/user.dals/category.dals',
);
jest.mock(
  '../database/repositories/user.repositories/user.dals/typeGrant.dals',
);
jest.mock(
  '../database/repositories/user.repositories/user.dals/user.dals',
);

describe('StudentService', () => {
  let studentService;

  beforeEach(() => {
    studentService = new StudentService();
  });

  it('should create a student successfully', async () => {
    studentService.personRepositories.createPerson.mockResolvedValue({
      id: 1,
      name: 'John Doe',
    });
    studentService.categoryDALs.getCategoryByName.mockResolvedValue({
      id: 1,
      name: 'Science',
    });
    studentService.typeGrantDALs.getTypeGrantByName.mockResolvedValue({
      id: 1,
      name: 'Full Grant',
    });
    studentService.userDALs.createUser.mockResolvedValue({ id: 1 });
    studentService.studentDALs.checkEnrollmentUnique.mockResolvedValue(
      true,
    );
    studentService.studentDALs.createStudent.mockResolvedValue({
      id: 1,
      enrollment: '12345',
    });

    const userData = {
      name: 'John Doe',
      category: 'Science',
      enrollment: '12345',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
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
    const userData = {
      name: 'John Doe',
      category: 'Science',
      enrollment: '12345',
      dailyMeals: 4,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(
      UnprocessedEntityError,
    );
    expect(studentService.userDALs.createUser).not.toHaveBeenCalled();
  });

  it('should throw NotFoundError if enrollment is undefined', async () => {
    const userData = {
      name: 'John Doe',
      category: 'Science',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(
      NotFoundError,
    );
    expect(studentService.userDALs.createUser).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError if enrollment is not provided', async () => {
    const userData = {
      name: 'John Doe',
      category: 'Science',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(
      BadRequestError,
    );
    expect(studentService.userDALs.createUser).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError if enrollment is not unique', async () => {
    studentService.personRepositories.createPerson.mockResolvedValue({
      id: 1,
      name: 'John Doe',
    });
    studentService.categoryDALs.getCategoryByName.mockResolvedValue({
      id: 1,
      name: 'Science',
    });
    studentService.typeGrantDALs.getTypeGrantByName.mockResolvedValue({
      id: 1,
      name: 'Full Grant',
    });
    studentService.userDALs.createUser.mockResolvedValue({ id: 1 });
    studentService.studentDALs.checkEnrollmentUnique.mockResolvedValue(
      false,
    );

    const userData = {
      name: 'John Doe',
      category: 'Science',
      enrollment: '12345',
      dailyMeals: 3,
      typeGrant: 'Full Grant',
      picture: 'path/to/picture.jpg',
    };

    await expect(studentService.createStudent(userData)).rejects.toThrow(
      BadRequestError,
    );
  });
});

