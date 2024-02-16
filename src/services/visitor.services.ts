import {VisitorDALs} from '../database/repositories/user.repositories/user.dals/visitor.dals'
import {PersonRepositories} from '../database/repositories/person.repositories'
import {CategoryDALs} from '../database/repositories/user.repositories/user.dals/category.dals'
import {TypeGrantDALs} from '../database/repositories/user.repositories/user.dals/typeGrant.dals'
import {UserDALs} from "../database/repositories/user.repositories/user.dals/user.dals";
import {IUserData} from '../intefaces/user.interfaces'
import {NotFoundError} from "../helpers/errors.helpers";

class VisitorService {

    private readonly visitorDALs: VisitorDALs;
    private readonly personRepositories: PersonRepositories
    private readonly categoryDALs: CategoryDALs
    private readonly typeGrantDALs: TypeGrantDALs;
    private readonly userDALs: UserDALs

    constructor() {
        this.visitorDALs = new VisitorDALs()
        this.personRepositories = new PersonRepositories()
        this.categoryDALs = new CategoryDALs()
        this.typeGrantDALs = new TypeGrantDALs()
        this.userDALs = new UserDALs()
    }

    async createVisitor({name, category, dailyMeals, typeGrant, picture}: IUserData) {
        const createPerson = await this.personRepositories.createPerson({name});
        const getCategory = await this.categoryDALs.getCategoryByName(category);
        const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);

        if (getCategory === null || getTypeGrant === null) {
            throw new NotFoundError({message: 'Category or Type Grant not found'})
        }

        const createUser = await this.userDALs.createUser({
            categoryId: getCategory.id,
            typeGrantId: getTypeGrant.id,
            personId: createPerson.id
        });

        const visitors = await this.visitorDALs.createVisitor(createUser.id);

        return visitors;
    }
}

export {VisitorService};
