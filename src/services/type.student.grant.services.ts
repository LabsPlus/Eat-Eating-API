import {TypeStudentGrantDALs} from "../database/data.access/type.student.grant.dals";
import {ITypeStudentGrantCreate} from "../intefaces/type.student.grant.interfaces";
import dotenv from 'dotenv';

dotenv.config();

class TypeStudentGrantServices {

    private typeStudentGrantDALs: TypeStudentGrantDALs;

    constructor() {
        this.typeStudentGrantDALs = new TypeStudentGrantDALs();
    }

    async createTypeGrant({name, description}: ITypeStudentGrantCreate) {
        const findTypeGrantByName = await this.typeStudentGrantDALs.findTypeGrantByName(name);
        if (findTypeGrantByName) {
            throw new Error('Type grant name already exists');
        }

        const result = await this.typeStudentGrantDALs.createTypeGrant({
            name,
            description
        });
        return result;
    }

    async getAllTypeGrant() {
        const result = await this.typeStudentGrantDALs.getAllTypeGrant();
        return result;
    }
    async deleteTypeGrantById(id: string){
        const result = await this.typeStudentGrantDALs.deleteTypeGrantById(id);
        if(!result){
            throw new Error("Category not found");
        }
        return result;
    }
    async deleteAllTypeGrants() {
        const result = await this.typeStudentGrantDALs.deleteAllTypeGrant();
        return result;
    }
}

export {TypeStudentGrantServices}