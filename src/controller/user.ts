import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user';
import { InvalidConnectionError } from 'sequelize';

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
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }

  async authUser(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    try {
      const result = await this.userServices.authUser({ email, password });

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const { refreshToken } = request.body;

    try {
      const result = await this.userServices.refreshToken(refreshToken);

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }
}

export { UserController };
