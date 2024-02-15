import {VisitorService} from '../services/visitor.services';
import {StudentService} from '../services/student.services';
import {EmployeeService} from '../services/employee.services';

class UserControllers {

    private readonly visitorService: VisitorService;
    private readonly studentService: StudentService;
    private readonly employeeService: EmployeeService;

    constructor() {
        this.visitorService = new VisitorService();
        this.studentService = new StudentService();
        this.employeeService = new EmployeeService();
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
