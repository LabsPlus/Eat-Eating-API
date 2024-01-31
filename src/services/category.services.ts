import { CategoryDALs } from '../database/data.access/category.dals';
import { ErrorsHelpers } from '../helpers/errors.helpers';
import {
  ICategoryCreate,
  ICategoryUpdate,
} from '../intefaces/category.interfaces';
import dotenv from 'dotenv';
dotenv.config();

class CategoryServices {
  private categoryDALs: CategoryDALs;

  constructor() {
    this.categoryDALs = new CategoryDALs();
  }

  async createCategory({ name, description }: ICategoryCreate) {
    const findCategoriaByName = await this.categoryDALs.findCategoriaByName(
      name,
    );
    if (findCategoriaByName) {
      throw new ErrorsHelpers({
        message: 'Category already exists',
        statusCode: 401,
      });
    }

    const result = await this.categoryDALs.createCategory({
      name,
      description,
    });
    return result;
  }

  async getAllCategories() {
    const result = await this.categoryDALs.getAllCategories();
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Unable to search categories',
        statusCode: 401,
      });
    }

    return result;
  }

  async updateCategory({ id, name, description }: ICategoryUpdate) {
    const category = await this.categoryDALs.existsCategory(id);
    if (!category) {
      throw new ErrorsHelpers({
        message: 'Category not found',
        statusCode: 401,
      });
    }

    const result = await this.categoryDALs.updateCategory({
      id,
      name,
      description,
    });
    return result;
  }

  async deleteById(id: string) {
    const result = await this.categoryDALs.deleteCategoryById(id);
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Category not found',
        statusCode: 401,
      });
    }
    return result;
  }

  async deleteAllCategories() {
    const result = await this.categoryDALs.deleteAllCategories();
    if (!result) {
      throw new ErrorsHelpers({
        message: 'Unable to delete categories',
        statusCode: 401,
      });
    }

    return result;
  }
}

export { CategoryServices };
