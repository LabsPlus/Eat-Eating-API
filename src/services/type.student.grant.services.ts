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
      throw new ErrorsHelpers('Type grant name already exists', 401);
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
      throw new ErrorsHelpers('Unable to search type grants', 401);
    }

    return result;
  }

  async updateTypeGrant({ id, name, description }: ITypeStudentGrantUpdate) {
    const typeGrant = await this.typeStudentGrantDALs.existsTipoBolsa(id);
    if (!typeGrant) {
      throw new ErrorsHelpers('Type Grant not found', 401);
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
      throw new ErrorsHelpers('Category not found', 401);
    }
    return result;
  }

  async deleteAllTypeGrants() {
    const result = await this.typeStudentGrantDALs.deleteAllTypeGrant();
    if (!result) {
      throw new ErrorsHelpers('Type Grant not found', 401);
    }

    return result;
  }
}

export { TypeStudentGrantServices };
