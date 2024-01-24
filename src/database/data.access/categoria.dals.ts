import {prisma} from "../prisma.databases";
import {ICategoriaCreate} from "../../intefaces/categoria.interfaces";

class CategoriaDALs {
    async createCategoria(
        {name, description}: ICategoriaCreate) {
        const result = await prisma.categoria.create({
            data: {name, description},
        });

        return result;
    }

    async deleteAllCategoria() {
        const result = await prisma.categoria.deleteMany();
        return result;
    }

    async findCategoriaByName(name: string) {
        const result = await prisma.categoria.findFirst({
            where: {
                name: name,
            },
        });
        return result;
    }

    async getAllCategoria() {
        const categorias = await prisma.categoria.findMany();
        return categorias;
    }

    async existsCategoria(categoriaId: number | undefined): Promise<boolean> {
        const result = await prisma.categoria.findUnique({
            where: {
                id: categoriaId,
            },
        });
        return Boolean(result); // Retorna true se result não for nulo, e false caso contrário
    }
}

export {CategoriaDALs};