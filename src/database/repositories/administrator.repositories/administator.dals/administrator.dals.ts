import { prisma } from '../../../prisma.databases';
import { IAdministratorData } from '../../../../intefaces/administrator.interfaces';

class AdministratorDALs {
  async createAdministrator({ email, password, emailRecovery,  name, phone, picture}: IAdministratorData) {
     const result = await prisma.$transaction(async (prisma) => {
      const person = await prisma.person.create({
        data: {name}
      });
      const pictureUrl = await prisma.picture.create({
        data: {url: picture, personId:  person.id}
      });
      const login = await prisma.loginAdministrator.create({
        data: { email, password, emailRecovery },
      });
      const administrator = await prisma.administrator.create({
        data: {isMaster: false, phone, loginAdmId: login.id,  personId: person.id}
      })
      return { pictureUrl, login, administrator };
    });
    return result;
  }


  

}

export { AdministratorDALs };
