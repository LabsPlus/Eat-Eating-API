import {Request, Response, NextFunction} from 'express';

import {VisitorService} from '../services/visitor.services';
import {StudentService} from '../services/student.services';
import {EmployeeService} from '../services/employee.services';
import {UserServices} from '../services/user.services';
import {BadRequestError} from '../helpers/errors.helpers';

class UserControllers {
    private readonly visitorService: VisitorService;
    private readonly studentService: StudentService;
    private readonly employeeService: EmployeeService;
    private readonly userServices: UserServices;

    constructor() {
        this.visitorService = new VisitorService();
        this.studentService = new StudentService();
        this.employeeService = new EmployeeService();
        this.userServices = new UserServices();
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        const {
            name,
            enrollment,
            category,
            typeGrant,
            dailyMeals,
            picture,
            course,
            cpf,
            born,
            email,
            password,
            emailRecovery,
        } = request.body;
        const users = {
            name,
            enrollment,
            category,
            typeGrant,
            dailyMeals,
            picture,
            course,
            cpf,
            born,
            email,
            password,
            emailRecovery,
        };

        switch (category) {
            case 'ESTUDANTE':
                const result = await this.studentService.createStudent(users);
                return response.status(201).json(result);
            case 'FUNCIONARIO':
                const resultEmployee = await this.employeeService.createEmployee(users);
                return response.status(201).json(resultEmployee);
            case 'VISITANTE':
                const resultVisitor = await this.visitorService.createVisitor(users);
                return response.status(201).json(resultVisitor);
            default:
                throw new BadRequestError({message: 'Category NotFound'});
        }
    }

    async updateAnUser(request: Request, response: Response, next: NextFunction) {
        const {
            name,
            enrollment,
            category,
            typeGrant,
            dailyMeals,
            picture,
            course,
            cpf,
            born,
            emailRecovery,
            password
        } = request.body;
        const {id} = request.params;

        const result = await this.userServices.updateAnUser(
            {
                name,
                category,
                dailyMeals,
                typeGrant,
                picture,
                enrollment,
                emailRecovery,
                password
            },
            Number(id),
        );

        return response.status(200).json(result);
    }

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        const result = await this.userServices.listAllUsers();

        return response.status(200).json(result);
    }

    async deleteUserById(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const {id} = request.params;
        const result = await this.userServices.deleteById(Number(id));

        return response.status(200).json(result);
    }
}

export {UserControllers};
