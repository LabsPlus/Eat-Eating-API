import { CategoryServices } from '../services/category.services';
import { NextFunction, Request, Response } from 'express';

class CategoryControllers {
  private categoryServices: CategoryServices;

  constructor() {
    this.categoryServices = new CategoryServices();
  }

  async createCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { name, description } = request.body;
    const result = await this.categoryServices.createCategory({
      name,
      description,
    });

    return response.status(201).json(result);
  }

  async listAllCategories(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const result = await this.categoryServices.getAllCategories();

    return response.status(200).json(result);
  }

  async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params;
    const { name, description } = request.body;

    const idnumber: number = parseInt(id);
    const category = await this.categoryServices.updateCategory({
      id: idnumber,
      name,
      description,
    });

    return response.status(201).json(category);
  }

  async deleteCategoryById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params;
    const result = await this.categoryServices.deleteById(id);

    return response.status(200).json(result);
  }

  async deleteAllCategories(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const result = await this.categoryServices.deleteAllCategories();

    return response.status(204).json(result);
  }
}

export { CategoryControllers };
