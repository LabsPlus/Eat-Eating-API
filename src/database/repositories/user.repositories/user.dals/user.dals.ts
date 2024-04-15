import { prisma } from '../../../prisma.databases';
import {
  IUserCreate,
  IUserUpdate,
} from '../../../../intefaces/user.interfaces';
import {
  BadRequestError,
  NotFoundError,
} from '../../../../helpers/errors.helpers';

class UserDALs {
  async createUser({
    categoryId,
    personId,
    typeGrantId,
    loginUserId,
    dailyMeals,
  }: IUserCreate) {
    const result = await prisma.user.create({
      data: {
        categoryId,
        personId,
        typeGrantId,
        dailyMeals,
        loginUserId,
      },
    });

    return result;
  }

  async listAllUsers() {
    let results = await prisma.user.findMany({
      select: {
        id: true,
        categoryId: false,
        personId: false,
        typeGrantId: false,
        dailyMeals: true,
        person: {
          select: {
            name: true,
            cpf: true,
            born: true,
            Administrator: {
              select: {
                isMaster: true,
                login: true,
              },
            },
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        typeGrant: {
          select: {
            name: true,
          },
        },
        loginUser: {
          select: {
            email: true,
            emailRecovery: true,
          },
        },
        userTicketsCount: {
          select: {
            totalTicketsOfUserActive: true,
            ticket: {
              orderBy: {
                purchaseDate: 'desc',
              },
              take: 1,
              select: {
                purchaseDate: true,
              },
            },
          },
        },
      },
    });

    return results;
  }

  async updateUser({
    id,
    categoryId,
    name,
    typeGrantId,
    dailyMeals,
  }: IUserUpdate) {
    await prisma.user.update({
      where: { id },
      data: {
        person: {
          update: {
            name,
          },
        },

        dailyMeals,
      },
    });

    const result = await prisma.user.update({
      where: { id },
      data: {
        categoryId,
        typeGrantId,
      },
    });

    return result;
  }

  async getUserCategoryNameByUserId(id: number) {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return result?.category?.name || 'Categoria não encontrada';
  }

  async existsUserById(id: number) {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async deleteUserById(id: number) {
    const category = await this.getUserCategoryNameByUserId(id);

    switch (category) {
      case String('ESTUDANTE'):
        await prisma.student.deleteMany({
          where: {
            userId: id,
          },
        });
        break;
      case String('FUNCIONARIO'):
        await prisma.employee.deleteMany({
          where: {
            userId: id,
          },
        });
        break;
      case String('VISITANTE'):
        await prisma.visitor.deleteMany({
          where: {
            userId: id,
          },
        });
        break;
      default:
        break;
    }

    const result = await prisma.user.delete({
      where: { id: id },
    });

    return result;
  }
}

export { UserDALs };
