import {Router} from 'express';
import {TypeStudentGrantControllers} from "../controllers/type.student.grant.controllers";

class TypeStudentGrantRoutes {

    private router: Router;
    private typeStudentGrantControllers: TypeStudentGrantControllers;

    constructor() {
        this.router = Router();
        this.typeStudentGrantControllers = new TypeStudentGrantControllers();
    }

    getRoutes() {
        this.router.get(
            '/listAllTypesGrants',
            this.typeStudentGrantControllers.listAllTypeGrant.bind(this.typeStudentGrantControllers),
        );
        return this.router;
    }

    postRoutes() {
        this.router.post(
            '/createTypeGrant',
            this.typeStudentGrantControllers.createTypeGrant.bind(this.typeStudentGrantControllers),
        );
        return this.router;
    }

    deleteRoutes() {
        this.router.delete(
            '/deleteTypeGrant',
            this.typeStudentGrantControllers.deleteAllTypeGrant.bind(this.typeStudentGrantControllers),
        );
        return this.router;
    }
}

export {TypeStudentGrantRoutes};