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
}

export { UserDAL };
