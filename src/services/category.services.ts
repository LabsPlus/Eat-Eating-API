import {CategoryDALs} from "../database/data.access/category.dals";
import {ICategoryCreate} from "../intefaces/category.interfaces";
import dotenv from 'dotenv';
dotenv.config();

class CategoryServices {

    private categoryDALs: CategoryDALs;

    constructor() {
        this.categoryDALs = new CategoryDALs();
    }

    async createCategory({name, description}: ICategoryCreate) {
        const findCategoriaByName = await this.categoryDALs.findCategoriaByName(name);
        if (findCategoriaByName) {
            throw new Error('Category name already exists');
        }

        const result = await this.categoryDALs.createCategoria({
            name,
            description
        });
        return result;
    }

    async getAllCategories() {
        const result = await this.categoryDALs.getAllCategories();
        return result;
    }

    async deleteAllCategories() {
        const result = await this.categoryDALs.deleteAllCategories();
        return result;
    }
}

export {CategoryServices};