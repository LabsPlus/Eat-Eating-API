import { prisma } from '../../../prisma.databases';
import { IAdministratorData, IAdministratorUpdate } from '../../../../intefaces/administrator.interfaces';

class AdministratorDALs {
  async createAdministrator({
    email,
    password,
    emailRecovery,
    name,
    phone,
    picture,
  }: IAdministratorData) {
    const result = await prisma.$transaction(async (prisma) => {
      const person = await prisma.person.create({
        data: { name },
      });
      const pictureUrl = await prisma.picture.create({
        data: { url: picture, personId: person.id },
      });
      const login = await prisma.loginAdministrator.create({
        data: { email, password, emailRecovery },
      });
      const administrator = await prisma.administrator.create({
        data: {
          isMaster: false,
          phone,
          loginAdmId: login.id,
          personId: person.id,
        },
      });
      return { pictureUrl, login, administrator };
    });
    return result;
  }
  async updateAdministrator(
  {
    email,
    personId,
    adminId,
    password,
    emailRecovery,
    name,
    phone,
    picture,
  }: IAdministratorUpdate
) {
  const result = await prisma.$transaction(async (prisma) => {
    // Atualiza o nome apenas se fornecido
    let person;
    if (name) {
      person = await prisma.person.update({
        where: { id: personId },
        data: { name },
      });
    }

    // Atualiza a foto apenas se fornecida
    let pictureUrl;
    if (picture) {
      pictureUrl = await prisma.picture.update({
        where: { personId },
        data: { url: picture },
      });
    }

    // Atualiza o telefone apenas se fornecido
    let administrator = await prisma.administrator.update({
      where: { id: adminId },
      data: {
        ...(phone && { phone }),
      },
    });

    // Prepara dados de login para atualização
    const loginData: { email?: string; password?: string; emailRecovery?: string } = {};
    if (email) loginData.email = email;
    if (emailRecovery) loginData.emailRecovery = emailRecovery;
    if (password) loginData.password = password;

    // Atualiza login apenas se houver dados a serem atualizados
    let login;
    if (Object.keys(loginData).length > 0) {
      login = await prisma.loginAdministrator.update({
        where: { id: administrator.id },
        data: loginData,
      });
    }

    return { person, pictureUrl, administrator, login };
  });

  return result;
}

  async findAdministrator(id: number) {
    const result = prisma.administrator.findUnique({
      where: {
        id,
      },
    });

    return result;
  }
}

export { AdministratorDALs };
