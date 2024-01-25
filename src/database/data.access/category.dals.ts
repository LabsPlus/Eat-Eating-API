import {prisma} from "../prisma.databases";
import {ICategoryCreate} from "../../intefaces/category.interfaces";

class CategoryDALs {
    async createCategoria(
        {name, description}: ICategoryCreate) {
        const result = await prisma.category.create({
            data: {name, description},
        });
        return result;
    }

    async deleteAllCategories() {
        const result = await prisma.category.deleteMany();
        return result;
    }

    async findCategoriaByName(name: string) {
        const result = await prisma.category.findFirst({
            where: {
                name: name,
            },
        });
        return result;
    }

    async getAllCategories() {
        const categories = await prisma.category.findMany();
        return categories;
    }

    async existsCategory(categoryId: number | undefined): Promise<boolean> {
        const result = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        return Boolean(result); // Retorna true se result não for nulo, e false caso contrário
    }
}

export {CategoryDALs};