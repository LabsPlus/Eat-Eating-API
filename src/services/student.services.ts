import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { PersonDALs } from '../database/repositories/person.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { IUserData } from '../intefaces/user.interfaces';
import { NotFoundError } from '../helpers/errors.helpers';

class StudentService {
  private readonly studentDALs: StudentDALs;
  private readonly personRepositories: PersonDALs;
  private readonly categoryDALs: CategoryDALs;
  private readonly typeGrantDALs: TypeGrantDALs;
  private readonly userDALs: UserDALs;

  constructor() {
    this.studentDALs = new StudentDALs();
    this.personRepositories = new PersonDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.userDALs = new UserDALs();
  }

  async createStudent({
    name,
    category,
    enrollment,
    dailyMeals,
    typeGrant,
    picture,
  }: IUserData) {
    const createPerson = await this.personRepositories.createPerson(name);
    const getCategory = await this.categoryDALs.getCategoryByName(category);
    const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);
    if(enrollment === undefined){
        throw new NotFoundError({ message: 'Enrollment is undefined' });
    }
    if (getCategory === null || getTypeGrant === null) {
      throw new NotFoundError({ message: 'Category or Type Grant not found' });
    }

    const createUser = await this.userDALs.createUser({
      categoryId: getCategory.id,
      typeGrantId: getTypeGrant.id,
      personId: createPerson.id,
    });

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
    } 
  }
}

export { StudentService };