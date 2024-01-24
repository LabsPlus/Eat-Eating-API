import {TipoBolsaDALs} from "../database/data.access/tipoBolsa.dals";
import {ITipoBolsaCreate} from "../intefaces/tipoBolsa.interfaces";
import dotenv from 'dotenv';

dotenv.config();

class TipoBolsaServices {

    private tipoBolsaDALs: TipoBolsaDALs;

    constructor() {
        this.tipoBolsaDALs = new TipoBolsaDALs();
    }

    async createTipoBolsa({name, description}: ITipoBolsaCreate) {
        const findTipoBolsaByName = await this.tipoBolsaDALs.findTipoBolsaByName(name);
        if (findTipoBolsaByName) {
            throw new Error('TipoBolsa name already exists');
        }

        const result = await this.tipoBolsaDALs.createTipoBolsa({
            name,
            description
        });
        return result;
    }

    async getAllTipoBolsas() {
        const result = await this.tipoBolsaDALs.getAllTipoBolsa();
        return result;
    }

    async deleteAllTipoBolsas() {
        const result = await this.tipoBolsaDALs.deleteAllTipoBolsa();
        return result;
    }
}

export {TipoBolsaServices}