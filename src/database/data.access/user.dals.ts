import {prisma} from "../prisma.databases";
import {IUserCreate} from "../../intefaces/user.interfaces";

class UserDALs {

    async createUser(
        {
            name,
            matricula,
            categoriaId,
            tipoDeBolsaId,
            refeicoesDiarias
        }: IUserCreate) {

        const result = await prisma.user.create({
            data: {
                name,
                matricula,
                categoriaId,
                tipoDeBolsaId,
                refeicoesDiarias,
            },
        });

        return result;
    }

    async listAllUsers() {
        const users = await prisma.user.findMany({
            include: {
                Categoria: true,
                TipoDeBolsa: true,
            },
        });
        return users;
    }

    async deleteAllUsers() {
        const users = await prisma.user.deleteMany();
        return users;
    }

    async findUserByMatricula(matricula: string) {
        const user = await prisma.user.findUnique({
            where: {
                matricula,
            },
        });
        return user;
    }
}

export {UserDALs};