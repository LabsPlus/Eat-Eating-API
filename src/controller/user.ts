import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user';

class UserController {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { email, password, emailRecovery } = request.body;
    try {
      const result = await this.userServices.createUser({
        email,
        password,
        emailRecovery,
      });

      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
