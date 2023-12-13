import { hash } from 'bcrypt';
import { UserDAL } from '../database/data_access/user';
import { IUserCreate } from '../intefaces/user';

class UserServices {
  private userDAL: UserDAL;

  constructor() {
    this.userDAL = new UserDAL();
  }

  async createUser({ email, password, emailRecovery }: IUserCreate) {
    const passwordHash = await hash(password, 10);

    const result = await this.userDAL.createUser({
      email,
      password: passwordHash,
      emailRecovery,
    });

    return result;
  }
}

export { UserServices };
