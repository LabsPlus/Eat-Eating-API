import { TypeStudentGrantDALs } from '../database/data.access/type.student.grant.dals';
import { ErrorsHelpers } from '../helpers/errors.helpers';
import {
  ITypeStudentGrantCreate,
  ITypeStudentGrantUpdate,
} from '../intefaces/type.student.grant.interfaces';
import dotenv from 'dotenv';

dotenv.config();

class TypeStudentGrantServices {
  private typeStudentGrantDALs: TypeStudentGrantDALs;

  constructor() {
    this.typeStudentGrantDALs = new TypeStudentGrantDALs();
  }

  async createTypeGrant({ name, description }: ITypeStudentGrantCreate) {
    const findTypeGrantByName =
      await this.typeStudentGrantDALs.findTypeGrantByName(name);
    if (findTypeGrantByName) {
      throw new ErrorsHelpers({
        message: 'Type grant name already exists',
        statusCode: 401,
      });
    }

    const result = await this.typeStudentGrantDALs.createTypeGrant({
      name,
      description,
    });
    return result;
  }

  async getAllTypeGrant() {
    const result = await this.typeStudentGrantDALs.getAllTypeGrant();
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Unable to search type grants',
        statusCode: 401,
      });
    }

    return result;
  }

  async updateTypeGrant({ id, name, description }: ITypeStudentGrantUpdate) {
    const typeGrant = await this.typeStudentGrantDALs.existsTipoBolsa(id);
    if (!typeGrant) {
      throw new ErrorsHelpers({
        message: 'Type Grant not found',
        statusCode: 401,
      });
    }

    const result = await this.typeStudentGrantDALs.updateTypeGrant({
      id,
      name,
      description,
    });

    return result;
  }

  async deleteTypeGrantById(id: string) {
    const result = await this.typeStudentGrantDALs.deleteTypeGrantById(id);
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Category not found',
        statusCode: 401,
      });
    }
    return result;
  }

  async deleteAllTypeGrants() {
    const result = await this.typeStudentGrantDALs.deleteAllTypeGrant();
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Type Grant not found',
        statusCode: 401,
      });
    }

    return result;
  }
}

export { TypeStudentGrantServices };
