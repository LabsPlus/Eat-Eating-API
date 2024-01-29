import { prisma } from '../prisma.databases';
import { IUserCreate, IUserUpdate } from '../../intefaces/user.interfaces';

class UserDALs {
  async createUser({
    name,
    enrollment,
    categoryId,
    typeStudentGrantId,
    dailyMeals,
  }: IUserCreate) {
    const result = await prisma.user.create({
      data: {
        name,
        enrollment,
        categoryId,
        typeStudentGrantId,
        dailyMeals,
      },
    });

    return result;
  }

  async listAllUsers() {
    const users = await prisma.user.findMany({
      include: {
        Category: true,
        TypeStudentGrant: true,
      },
    });
    return users;
  }

  async deleteAllUsers() {
    const users = await prisma.user.deleteMany();
    return users;
  }

  async existsUserByEnrollment(enrollment: string): Promise<boolean> {
    const result = await prisma.user.findUnique({
      where: {
        enrollment,
      },
    });

    return !!result;
  }
  async findUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async updateUser(data: IUserUpdate) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return user;
  }
  async deleteUserById(id: string) {
    const user = await prisma.user.delete({ where: { id: Number(id) } });
    return user;
  }
}

export { UserDALs };
