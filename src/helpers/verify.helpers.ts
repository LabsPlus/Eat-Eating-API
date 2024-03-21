import {IVerifyUpdateByCategory} from '../intefaces/verify.interfaces'
import { BadRequestError, UnprocessedEntityError } from './errors.helpers';
import { StudentService } from '../services/student.services';
import { EmployeeService } from '../services/employee.services';
import { VisitorService } from '../services/visitor.services';
class VerifyHelpers{
    private readonly studentService: StudentService;
    private readonly employeeService: EmployeeService;
    private readonly visitorService: VisitorService;
    constructor(){
        this.studentService = new StudentService();
        this.employeeService = new EmployeeService();
        this.visitorService = new VisitorService();
    }
     async verifyUpdateByCategory({userId, oldCategory, category, enrollment}: IVerifyUpdateByCategory): Promise<any>{
            
            switch (category) {
                case "ALUNO":
                    return await this.studentService.updatetoStudent({userId, oldCategory, category, enrollment});
                case "FUNCIONARIO":
                    
                   return await this.employeeService.updateToEmployee({userId, oldCategory, category, enrollment});
                case "VISITANTE":
                    return await this.visitorService.updatetoVisitor({userId, oldCategory, category, enrollment});
                default:
                    throw new BadRequestError({message: 'Category NotFound'});
            }


    }
}

export {VerifyHelpers}
