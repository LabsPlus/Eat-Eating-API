import { prisma } from '../../../prisma.databases';
import {
  ILoginCreate,
  ILoginFind,
  ILoginUserUpdate,
} from '../../../../intefaces/login.interfaces';

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

  async findLoginByEmail(email: string) {
    const result = await prisma.loginUser.findUnique({
      where: {
        email,
      },
    });

    return result;
  }

  async findLoginByEmailOREmailRecovery({email, emailRecovery}: ILoginFind) {
    const result = await prisma.loginUser.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            emailRecovery,
          },
        ],
      },
    });

    return result;
  }

  async findLoginById(id: number) {
    const result = await prisma.loginUser.findUnique({
      where: {
        id,
      },
    });

    return result;
  }
  async updateLogin({ id, emailRecovery, password, email }: ILoginUserUpdate) {
    const result = await prisma.loginUser.update({
      where: { id: id },
      data: {
        email,
        emailRecovery,
        password,
      },
    });
    return result;
  }

  async deleteLoginById(param: any) {
    const result = await prisma.loginUser.delete({
      where: {
        id: param,
      },
    });
    return result;
  }
}

export { LoginDALs };
