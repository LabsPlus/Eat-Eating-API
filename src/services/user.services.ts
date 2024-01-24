import {UserDALs} from "../database/data.access/user.dals";
import {IUserCreate} from "../intefaces/user.interfaces";
import {CategoriaDALs} from "../database/data.access/categoria.dals";
import {TipoBolsaDALs} from "../database/data.access/tipoBolsa.dals";
import dotenv from 'dotenv';
dotenv.config();

const {Link} = process.env;

class UserServices {

    private userDALs: UserDALs;
    private categoriaDALs: CategoriaDALs;
    private tipoDeBolsaDALs: TipoBolsaDALs;

    constructor() {
        this.userDALs = new UserDALs();
        this.categoriaDALs = new CategoriaDALs();
        this.tipoDeBolsaDALs = new TipoBolsaDALs();
    }

    async createUser({name, matricula, categoriaId, tipoDeBolsaId, refeicoesDiarias}: IUserCreate) {

        if (matricula === undefined || matricula === null || matricula === '') {
            throw new Error('Matricula is required');
        }

        const findUserByMatricula = await this.userDALs.findUserByMatricula(matricula);
        const existsCategoria = await this.categoriaDALs.existsCategoria(categoriaId);
        const existsTipoDeBolsa = await this.tipoDeBolsaDALs.existsTipoBolsa(tipoDeBolsaId);

        if (!existsCategoria) {
            throw new Error('Categoria not found');
        }

        if (!existsTipoDeBolsa) {
            throw new Error('Tipo de bolsa not found');
        }

        if (findUserByMatricula) {
            throw new Error('User matricula already exists');
        }

        const result = await this.userDALs.createUser({
            name,
            matricula,
            categoriaId,
            tipoDeBolsaId,
            refeicoesDiarias,
        });

        return result;
    }

    async listAllUsers() {
        const users = await this.userDALs.listAllUsers();
        return users.map(user => {
            const { tipoDeBolsaId, categoriaId, ...userWithoutUnwantedFields } = user;
            return userWithoutUnwantedFields;
        });
    }
    

    async deleteAllUsers() {
        const users = await this.userDALs.deleteAllUsers();
        return users;
    }
}


export {UserServices};
