import { prisma } from '../../../prisma.databases';
import {
  ILoginCreate,
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

  async findLoginByEmailOREmailRecovery(email: string, emailRecovery: string) {
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
  async updateLogin({ id, emailRecovery, password }: ILoginUserUpdate) {
    const result = await prisma.loginUser.update({
      where: { id: id },
      data: {
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
