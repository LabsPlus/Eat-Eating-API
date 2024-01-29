import { Request, Response, NextFunction } from 'express';
import { UserServices } from '../services/user.services';

class UserControllers {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  async createAnUser(request: Request, response: Response, next: NextFunction) {
    const { name, enrollment, categoryId, typeStudentGrantId, dailyMeals } =
      request.body;
    const user = await this.userServices.createUser({
      name,
      enrollment,
      categoryId,
      typeStudentGrantId,
      dailyMeals,
    });

    return response.status(201).json(user);
  }

  async updateUser(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const { name, enrollment, categoryId, typeStudentGrantId, dailyMeals } =
      request.body;

    const idnumber: number = parseInt(id);
    const user = await this.userServices.updateUser({
      id: idnumber,
      name,
      enrollment,
      categoryId,
      typeStudentGrantId,
      dailyMeals,
    });

    return response.status(201).json(user);
  }

  async listAllUsers(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userServices.listAllUsers();
      return response.status(200).json(users);
    } catch (error: any) {
      next(error);
      return response.status(401).json(error.message);
    }
  }

  async deleteUserById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params;
    const user = await this.userServices.deleteById(id);

    return response.status(200).json(user);
  }

  async deleteAllUsers(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const users = await this.userServices.deleteAllUsers();

    return response.status(204).json(users);
  }
}

export { UserControllers };
