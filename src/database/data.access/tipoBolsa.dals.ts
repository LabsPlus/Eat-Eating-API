import {prisma} from "../prisma.databases";
import {ITipoBolsaCreate} from "../../intefaces/tipoBolsa.interfaces";

class TipoBolsaDALs {

    async createTipoBolsa(
        {name, description}: ITipoBolsaCreate) {
        const result = await prisma.tipoDeBolsa.create({
            data: {name, description},
        });

        return result;
    }

    async findTipoBolsaByName(name: string) {
        const result = await prisma.tipoDeBolsa.findFirst({
            where: {
                name: name,
            },
        });
        return result;
    }

    async getAllTipoBolsa() {
        const tipoBolsa = await prisma.tipoDeBolsa.findMany();
        return tipoBolsa;
    }

    async deleteAllTipoBolsa() {
        const result = await prisma.tipoDeBolsa.deleteMany();
        return result;
    }

    async existsTipoBolsa(tipoDeBolsaId: number | undefined): Promise<boolean> {
        const result = await prisma.tipoDeBolsa.findUnique({
            where: {
                id: tipoDeBolsaId,
            },
        });
        return Boolean(result); // Retorna true se result não for nulo, e false caso contrário
    }
}

export {TipoBolsaDALs};