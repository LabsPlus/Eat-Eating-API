import {StudentDALs} from '../database/repositories/user.repositories/user.dals/student.dals';
import {PersonDALs} from '../database/repositories/person.dals';
import {CategoryDALs} from '../database/repositories/user.repositories/user.dals/category.dals';
import {TypeGrantDALs} from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import {UserDALs} from '../database/repositories/user.repositories/user.dals/user.dals';
import {IUserData} from '../intefaces/user.interfaces';
import {BadRequestError, NotFoundError, UnprocessedEntityError} from '../helpers/errors.helpers';

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
         if(dailyMeals < 1 || dailyMeals > 3){
            throw new UnprocessedEntityError({message: "Daily meals must be between 1 and 3"});
        }
        const createPerson = await this.personRepositories.createPerson(name);
        const getCategory = await this.categoryDALs.getCategoryByName(category);
        const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);
        if (enrollment === undefined) {
            throw new NotFoundError({message: 'Enrollment is undefined'});
        }
        if (getCategory === null || getTypeGrant === null) {
            throw new NotFoundError({message: 'Category or Type Grant not found'});
        }
       

        const createUser = await this.userDALs.createUser({
            categoryId: getCategory.id,
            typeGrantId: getTypeGrant.id,
            personId: createPerson.id,
            dailyMeals: dailyMeals
        });

        if(!enrollment){
            throw new BadRequestError({message: 'Enrollment is required'});
        }

        const isEnrollmentUnique = await this.studentDALs.checkEnrollmentUnique(enrollment);

        if (!isEnrollmentUnique) {
            throw new BadRequestError({message: 'Enrollment already exists, only one enrollment is allowed.'});
        }

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
            dailyMeals: dailyMeals
        }
    }
}

export {StudentService};
