import {Request, Response, NextFunction} from 'express';

import {VisitorService} from '../services/visitor.services';
import {StudentService} from '../services/student.services';
import {EmployeeService} from '../services/employee.services';
import {UserServices} from "../services/user.services";
import {BadRequestError} from "../helpers/errors.helpers";

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

    /*
    model User {
        id Int @id @default(autoincrement())

        personId    Int  @unique // 1-1 : (Obrigatório) Um usuário está associado a uma pessoa
        loginUserId Int? @unique // 1-1 : (Opcional) Um usuário está associado a um login
        categoryId  Int? // 1-1 : (Opcional) Um usuário está associado a uma categoria
        typeGrantId Int? // 1-1 : (Opcional) Um usuário está associado a um tipo de bolsa

        person    Person     @relation(fields: [personId], references: [id])
        category  Category?  @relation(fields: [categoryId], references: [id])
        loginUser LoginUser? @relation(fields: [loginUserId], references: [id])
        typeGrant TypeGrant? @relation(fields: [typeGrantId], references: [id])

        picture  Picture? // 1-1 : (Opcional) Um usuário está associado a uma imagem
        student  Student? // 1-1 : (Opcional) Um usuário está associado a um estudante
        visitor  Visitors? // 1-1 : (Opcional) Um usuário está associado a um visitante
        employee Employee? // 1-1 : (Opcional) Um usuário está associado a um funcionário
    }
     */
    async createUser(request: Request, response: Response, next: NextFunction) {
        const {name, enrollment, category, typeGrant, dailyMeals, picture, course, cpf, born} = request.body;
        const users = {
            name,
            enrollment,
            category,
            typeGrant,
            dailyMeals,
            picture,
            course,
            cpf,
            born
        };

        // const estudante: string = category.name.ESTUDANTE;
        // const visitante: string = category.name.VISITANTE;
        // const funcionario: string = category.name.FUNCIONARIO;

        switch (category) {
            case "ESTUDANTE":
                const result = await this.studentService.createStudent(users);
                return response.status(201).json(result);
            case "FUNCIONARIO":
                const resultEmployee = await this.employeeService.createEmployee(users);
                return response.status(201).json(resultEmployee);
            case "VISITANTE":
                const resultVisitor = await this.visitorService.createVisitor(users);
                return response.status(201).json(resultVisitor);
            default:
                throw new BadRequestError({message: 'Category NotFound'});
        }
    }

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        const result = await this.userServices.listAllUsers();

        return response.status(200).json(result);
    }

    async updateUsers(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params;
        const {name, enrollment, category, typeGrant, dailyMeals, picture, course} = request.body;
        const result = await this.userServices.updateUser({
            id,
            name,
            enrollment,
            category,
            typeGrant,
            dailyMeals,
            picture,
            course
        });

        return response.status(201).json(result);

    }

    async deleteUserById(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params;
        const result = await this.userServices.deleteById(Number(id));

        return response.status(204).json(result);
    }


    /*
    1 - Se chegar um aluno, vai para studentService:
      1.1 Criar um novo aluno,
     */

    /*
    2 - Se chegar um funcionário, vai para employeeService
        2.1 criar um novo funcionario
    */

    /*
    3 - Se chegar um visitante, vai para visitorService
        3.1 criar um novo visitante
     */

    /*
    4- O usuario vai conter as outras logicas
      4.1 listar todos os usuários,
      4.2 listar um usuario específico,
      4.3 atualizar um usuário
    */
}

export {UserControllers};
