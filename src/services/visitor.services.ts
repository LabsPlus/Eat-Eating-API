import {VisitorDALs} from '../database/repositories/user.repositories/user.dals/visitor.dals'
import {PersonDALs} from '../database/repositories/person.dals'
import {CategoryDALs} from '../database/repositories/user.repositories/user.dals/category.dals'
import {TypeGrantDALs} from '../database/repositories/user.repositories/user.dals/typeGrant.dals'
import {UserDALs} from "../database/repositories/user.repositories/user.dals/user.dals";
import {IUserData} from '../intefaces/user.interfaces'
import {NotFoundError, UnprocessedEntityError} from "../helpers/errors.helpers";

class VisitorService {

    private readonly visitorDALs: VisitorDALs;
    private readonly personRepositories: PersonDALs
    private readonly categoryDALs: CategoryDALs
    private readonly typeGrantDALs: TypeGrantDALs;
    private readonly userDALs: UserDALs

    constructor() {
        this.visitorDALs = new VisitorDALs()
        this.personRepositories = new PersonDALs()
        this.categoryDALs = new CategoryDALs()
        this.typeGrantDALs = new TypeGrantDALs()
        this.userDALs = new UserDALs()
    }

    async createVisitor({name, category, dailyMeals, typeGrant, picture}: IUserData) {
         if(dailyMeals < 1 || dailyMeals > 3){
            throw new UnprocessedEntityError({message: "Daily meals must be between 1 and 3"});
        }
        
        const createPerson = await this.personRepositories.createPerson(name);
        const getCategory = await this.categoryDALs.getCategoryByName(category);
        const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);

        if (getCategory === null || getTypeGrant === null) {
            throw new NotFoundError({message: 'Category or Type Grant not found'})
        }

        const createUser = await this.userDALs.createUser({
            categoryId: getCategory.id,
            typeGrantId: getTypeGrant.id,
            personId: createPerson.id,
            dailyMeals: dailyMeals
        });

        const visitors = await this.visitorDALs.createVisitor(createUser.id);

        return {
            visitorId: visitors.id,
            personName: createPerson.name,
            categoryName: getCategory.name,
            typeGrantName: getTypeGrant.name,
            dailyMeals: dailyMeals
        }
    }
}

export {VisitorService};
