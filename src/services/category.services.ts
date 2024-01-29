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
      throw new ErrorsHelpers('Category already exists', 401);
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
      throw new ErrorsHelpers('Unable to search categories', 401);
    }

    return result;
  }

  async updateCategory({ id, name, description }: ICategoryUpdate) {
    const category = await this.categoryDALs.existsCategory(id);
    if (!category) {
      throw new ErrorsHelpers('Category not found', 401);
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
      throw new ErrorsHelpers('Category not found', 401);
    }
    return result;
  }

  async deleteAllCategories() {
    const result = await this.categoryDALs.deleteAllCategories();
    if (!result) {
      throw new ErrorsHelpers('Unable to delete categories', 401);
    }

    return result;
  }
}

export { CategoryServices };
