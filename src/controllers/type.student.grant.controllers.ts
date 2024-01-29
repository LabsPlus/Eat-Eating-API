import { TypeStudentGrantServices } from '../services/type.student.grant.services';
import { NextFunction, Request, Response } from 'express';

class TypeStudentGrantControllers {
  private typeStudentGrantServices: TypeStudentGrantServices;

  constructor() {
    this.typeStudentGrantServices = new TypeStudentGrantServices();
  }

  async createTypeGrant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { name, description } = request.body;
    const result = await this.typeStudentGrantServices.createTypeGrant({
      name,
      description,
    });

    return response.status(201).json(result);
  }

  async listAllTypeGrant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const result = await this.typeStudentGrantServices.getAllTypeGrant();
    return response.status(200).json(result);
  }

  async updateTypeGrant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params;
    const { name, description } = request.body;

    const idnumber: number = parseInt(id);
    const typeGrant = await this.typeStudentGrantServices.updateTypeGrant({
      id: idnumber,
      name,
      description,
    });

    return response.status(201).json(typeGrant);
  }

  async deleteTypeGrantById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params;
    const result = await this.typeStudentGrantServices.deleteTypeGrantById(id);

    return response.status(200).json(result);
  }

  async deleteAllTypeGrant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const result = await this.typeStudentGrantServices.deleteAllTypeGrants();

    return response.status(204).json(result);
  }
}

export { TypeStudentGrantControllers };
