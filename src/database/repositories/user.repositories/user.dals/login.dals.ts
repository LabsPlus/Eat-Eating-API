import { prisma } from '../../../prisma.databases';
import { ILoginCreate } from '../../../../intefaces/login.interfaces';

class LoginDALs {
  async createLogin({ email, emailRecovery, password }: ILoginCreate) {
    const result = await prisma.loginUser.create({
      data: {
        email,
        emailRecovery,
        password,
      },
    });

    return result;
  }
}

export { LoginDALs };
