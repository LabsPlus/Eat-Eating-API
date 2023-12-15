import { User } from '../models/user';
import { IUserCreate } from '../../intefaces/user';

class UserDAL {
  async createUser({ email, password, emailRecovery }: IUserCreate) {
    const result = await User.create({
      email,
      password,
      emailRecovery,
    });

    return result;
  }

  async findUserByEmail(email: string) {
    const result = await User.findOne({ where: { email } });

    return result;
  }

  async findUserByToken(token: string) {
    const result = await User.findOne({ where: {resetToken: token} });

    return result;
  }

  async updatePassword(newPassword: string, user: User){
     user.password = newPassword;

     const result = await user.save();
     return result;
      
  }
  async updateResetToken(resetToken: string, resetTokenExpiry: Date, user: User){
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        const result = await user.save();
        return result.resetToken; // retorna o token para recuperação de senha
  }
}


export { UserDAL };
