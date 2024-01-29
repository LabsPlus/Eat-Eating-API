import {CategoryDALs} from "../database/data.access/category.dals";
import {ICategoryCreate, ICategoryUpdate} from "../intefaces/category.interfaces";
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
            throw new Error('Category already exists');
        }

        const result = await this.categoryDALs.createCategory({
            name,
            description
        });
        return result;
    }

    async getAllCategories() {
        const result = await this.categoryDALs.getAllCategories();
        return result;
    }

    async updateCategory({id, name, description}: ICategoryUpdate){
        const category = await this.categoryDALs.existsCategory(id);
        if(!category){
            throw new Error("Category not found");
        }

        const result = await this.categoryDALs.updateCategory({id, name, description});
        return result;
    }

    async deleteById(id: string){
        const result = await this.categoryDALs.deleteCategoryById(id);
        if(!result){
            throw new Error("Category not found");
        }
        return result;
    }

    async deleteAllCategories() {
        const result = await this.categoryDALs.deleteAllCategories();
        return result;
    }
}

export {CategoryServices};