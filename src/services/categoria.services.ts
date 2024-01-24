import {CategoriaDALs} from "../database/data.access/categoria.dals";
import {ICategoriaCreate} from "../intefaces/categoria.interfaces";
import dotenv from 'dotenv';
dotenv.config();

class CategoriaServices {

    private categoriaDALs: CategoriaDALs;

    constructor() {
        this.categoriaDALs = new CategoriaDALs();
    }

    async createCategoria({name, description}: ICategoriaCreate) {
        const findCategoriaByName = await this.categoriaDALs.findCategoriaByName(name);
        if (findCategoriaByName) {
            throw new Error('Categoria name already exists');
        }

        const result = await this.categoriaDALs.createCategoria({
            name,
            description
        });
        return result;
    }

    async getAllCategorias() {
        const result = await this.categoriaDALs.getAllCategoria();
        return result;
    }

    async deleteAllCategorias() {
        const result = await this.categoriaDALs.deleteAllCategoria();
        return result;
    }
}

export {CategoriaServices};