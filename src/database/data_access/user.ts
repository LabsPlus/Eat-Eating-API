import { Login } from '../models/login';
import { IUserCreate } from '../../intefaces/user';

class UserDAL {
  async createUser({ email, password, emailRecovery }: IUserCreate) {
    const result = await Login.create({
      email,
      password,
      emailRecovery,
    });

    return result;
  }

  async findUserByEmail(email: string) {
    const result = await Login.findOne({ where: { email } });

    return result;
  }

  async findUserByToken(token: string) {
    const result = await Login.findOne({ where: { resetToken: token } });

    return result;
  }

  async updatePassword(newPassword: string, login: Login) {
    login.password = newPassword;

    const result = await login.save();
    return result;
  }
  async updateResetToken(
    resetToken: string,
    resetTokenExpiry: Date,
    user: Login,
  ) {
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    const result = await user.save();
    return result.resetToken; // retorna o token para recuperação de senha
  }
}

export { UserDAL };
