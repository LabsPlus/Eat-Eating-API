import { UserDALs } from '../database/repositories/user.repositories/user.dals/user.dals';
import { CategoryDALs } from '../database/repositories/user.repositories/user.dals/category.dals';
import { TypeGrantDALs } from '../database/repositories/user.repositories/user.dals/typeGrant.dals';
import dotenv from 'dotenv';
import { IUserData, IUserDataUpdate } from '../intefaces/user.interfaces';
import { VerifyHelpers } from '../helpers/verify.helpers';
import { LoginDALs } from '../database/repositories/user.repositories/user.dals/login.dals';
import {
  BadRequestError,
  NotFoundError,
  UnprocessedEntityError,
} from '../helpers/errors.helpers';
import { hash } from 'bcrypt';
import { StudentDALs } from '../database/repositories/user.repositories/user.dals/student.dals';
import { EmployeeDALs } from '../database/repositories/user.repositories/user.dals/employee.dals';
import { EnrollmentDALs } from '../database/repositories/user.repositories/user.dals/enrollment.dals';
import { VisitorDALs } from '../database/repositories/user.repositories/user.dals/visitor.dals';
import { PersonDALs } from '../database/repositories/person.dals';
import { PictureDALs } from '../database/repositories/user.repositories/user.dals/picture.dals';
import { UserTicketsCountDALs } from '../database/repositories/ticket.repositories/userTicketsCount.dals';
import { EmailValidator } from '../helpers/validators/email.validators';
dotenv.config();

const { Link } = process.env;

class UserServices {
  userDALs: UserDALs;
  categoryDALs: CategoryDALs;
  typeGrantDALs: TypeGrantDALs;
  verifyHelpers: VerifyHelpers;
  loginDALs: LoginDALs;
  employeeDALs: EmployeeDALs;
  studentDALs: StudentDALs;
  enrollmentDALs: EnrollmentDALs;
  visitorDALs: VisitorDALs;
  personDALs: PersonDALs;
  userTicketsCountDALs: UserTicketsCountDALs;
  private readonly pictureDALs: PictureDALs;
  emailValidator: EmailValidator;

  constructor() {
    this.userDALs = new UserDALs();
    this.categoryDALs = new CategoryDALs();
    this.typeGrantDALs = new TypeGrantDALs();
    this.verifyHelpers = new VerifyHelpers();
    this.loginDALs = new LoginDALs();
    this.studentDALs = new StudentDALs();
    this.employeeDALs = new EmployeeDALs();
    this.enrollmentDALs = new EnrollmentDALs();
    this.visitorDALs = new VisitorDALs();
    this.personDALs = new PersonDALs();
    this.pictureDALs = new PictureDALs();
    this.userTicketsCountDALs = new UserTicketsCountDALs();
    this.emailValidator = new EmailValidator();
  }

  async updateAnUser(
    {
      name,
      category,
      dailyMeals,
      typeGrant,
      picture,
      enrollment,
      email,
      emailRecovery,
      password,
    }: IUserDataUpdate,
    id: number,
  ) {
    if (dailyMeals < 1 || dailyMeals > 3) {
      throw new UnprocessedEntityError({
        message: 'Daily meals must be between 1 and 3',
      });
    }
    const oldUser = await this.userDALs.existsUserById(id);
    if (!oldUser) {
      throw new NotFoundError({ message: 'User not Found!' });
    }
    const oldLogin = await this.loginDALs.findLoginById(oldUser.loginUserId!);
    if (!oldLogin) {
      throw new NotFoundError({ message: 'Login not Found!' });
    }
    const loginByEmailRecovery =
      await this.loginDALs.findLoginByEmailOREmailRecovery({
        emailRecovery,
      });
    const loginByEmail = await this.loginDALs.findLoginByEmail(email);

    if (
      loginByEmailRecovery &&
      loginByEmailRecovery.id !== oldUser.loginUserId
    ) {
      throw new BadRequestError({
        message: 'Email Recovery already exists, only one email is allowed.',
      });
    }

    if (
        !this.emailValidator.isValid(email) ||
        !this.emailValidator.isValid(emailRecovery)
    ) {
        throw new BadRequestError({ message: 'Invalid email format.' });
    }

    if (loginByEmail && loginByEmail.id !== oldUser.loginUserId) {
      throw new BadRequestError({
        message: 'Email already exists, only one email is allowed.',
      });
    }
    let passwordHash = oldLogin!.password; // recebe por padrão a senha antiga do usuario caso o administrador não mande nenhuma senha para trocar

    if (password) {
      passwordHash = await hash(password, 10); // troca a senha se existir uma senha para trocar
    }
    const updateLogin = await this.loginDALs.updateLogin({
      id: oldUser.loginUserId!,
      email: email,
      emailRecovery: emailRecovery,
      password: passwordHash,
    });

    const oldCategory = await this.categoryDALs.getCategoryById(
      oldUser!.categoryId!,
    );
    const getCategory = await this.categoryDALs.getCategoryByName(category);
    const getTypeGrant = await this.typeGrantDALs.getTypeGrantByName(typeGrant);

    if (getCategory === null || getTypeGrant === null) {
      throw new NotFoundError({ message: 'Category or Type Grant not found' });
    }

    if (!enrollment && category !== 'VISITANTE') {
      throw new BadRequestError({ message: 'Enrollment is required' });
    }

    if (oldCategory === null) {
      throw new NotFoundError({ message: 'old category not founded' });
    }
    let url = await this.pictureDALs.findPictureByUserId(id);
    if (picture) {
      url = await this.pictureDALs.updatePicture({ url: picture, userId: id });
    }

    await this.verifyHelpers.verifyUpdateByCategory({
      userId: id,
      oldCategory: oldCategory.name,
      category: category,
      enrollment: enrollment,
    });

    const updateUser = await this.userDALs.updateUser({
      id: id,
      categoryId: getCategory.id,
      typeGrantId: getTypeGrant.id,
      name: name,
      dailyMeals: dailyMeals,
    });

    return {
      id: updateUser.id,
      enrollment: enrollment,
      personName: name,
      categoryName: getCategory.name,
      typeGrantName: getTypeGrant.name,
      dailyMeals: dailyMeals,
      loginData: {
        email: updateLogin.email,
        emailRecovery: updateLogin.emailRecovery,
      },
      picture: url,
    };
  }

  async listAllUsers() {
    const users = await this.userDALs.listAllUsers();
    const usersArray: { user: any; enrrolment: any; picture: any }[] = [];
    await Promise.all(
      users.map(async (user) => {
        const picture = await this.pictureDALs.findPictureByUserId(user.id);
        let url = '';
        if (picture) {
          url = picture.url;
        }
        if (user.category?.name === 'ALUNO') {
          const result = await this.studentDALs.findEnrrolmentByUserId(user.id);

          if (result && result.enrollment) {
            usersArray.push({
              user: user,
              enrrolment: result.enrollment!,
              picture: url,
            });
          }
        }
        if (user.category?.name === 'FUNCIONARIO') {
          const result = await this.employeeDALs.findEnrrolmentByUserId(
            user.id,
          );
          if (result && result.enrollment) {
            usersArray.push({
              user: user,
              enrrolment: result!.enrollment,
              picture: url,
            });
          }
        }
        if (user.category?.name === 'VISITANTE') {
          usersArray.push({ user: user, enrrolment: '', picture: url });
        }
      }),
    );
    return usersArray;
  }

  /**
   * Método assíncrono para deletar um usuário pelo ID.
   *
   * @async
   * @param {number} id - O ID do usuário a ser deletado.
   * @returns {Promise<{message: string, id: number}>} - Um objeto contendo uma mensagem de sucesso e o ID do usuário deletado.
   * @throws {NotFoundError} Se o usuário com o ID fornecido não for encontrado.
   * @description
   * Este método primeiro verifica se o usuário existe chamando o método `existsUserById` da classe `UserDALs`.
   * Se o usuário não existir, um erro `NotFoundError` é lançado.
   * Se o usuário existir, o método `deleteUserById` da classe `UserDALs` é chamado para deletar o usuário.
   * Finalmente, um objeto contendo uma mensagem de sucesso e o ID do usuário deletado é retornado.
   */
  async deleteById(id: number): Promise<{ message: string; id: number }> {
    const user = await this.userDALs.existsUserById(id);

    if (!user) {
      throw new NotFoundError({ message: 'Usuário não encontrado' });
    }
    const category = await this.userDALs.getUserCategoryNameByUserId(id);
    // verifica se é empregado ou estudante para excluir a matricula
    const employeeOrStudent =
      category === 'ALUNO' || category === 'FUNCIONARIO';
    if (employeeOrStudent) {
      const userEntity =
        category === 'ALUNO'
          ? await this.studentDALs.findStudentByUserId(user.id)
          : await this.employeeDALs.findEmployeeByUserId(user.id);
      userEntity
        ? await this.enrollmentDALs.deleteEnrollmentById(
            userEntity?.enrollmentId,
          )
        : null;
    }
    // exclui em cascada o usuario, o ticket e a categoria referente a ele
    const userTicketsCount =
      await this.userTicketsCountDALs.findUserTicketsCountDALsByUserId(user.id);
    if (userTicketsCount) {
      await this.userTicketsCountDALs.deleteUserTicketsCountByUserId(user.id);
    }
    await this.loginDALs.deleteLoginById(user.loginUserId);
    await this.personDALs.deletePerson(user.personId);

    return { message: 'User successfully deleted', id: user.id };
  }
}

export { UserServices };
