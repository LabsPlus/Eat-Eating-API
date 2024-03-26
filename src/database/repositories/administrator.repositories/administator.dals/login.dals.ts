import { prisma } from '../../../prisma.databases';
import {
  ILoginCreate,
  ILoginUpdatePassword,
  ILoginUpdateResetToken,
} from '../../../../intefaces/login.interfaces';

class LoginDALs {
  async createLogin({ email, password, emailRecovery }: ILoginCreate) {
    const result = await prisma.loginAdministrator.create({
      data: { email, password, emailRecovery },
    });

    return result;
  }

  async findLoginByEmail(email: string) {
    const result = await prisma.loginAdministrator.findUnique({
      where: { email },
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

  async findLoginByToken(token: string) {
    const result = await prisma.loginAdministrator.findFirstOrThrow({
      where: { resetToken: token },
    });
    return result;
  }

  async updatePassword({ newPassword, email }: ILoginUpdatePassword) {
    const result = await prisma.loginAdministrator.update({
      where: { email },
      data: { password: newPassword, resetToken: null, resetTokenExpiry: null },
    });

    return result;
  }

  async updateResetToken({
    resetToken,
    resetTokenExpiry,
    email,
  }: ILoginUpdateResetToken) {
    const result = await prisma.loginAdministrator.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    return result;
  }
}

export { LoginDALs };
