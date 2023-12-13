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

  async authUser(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    try {
      const result = await this.userServices.authUser({ email, password });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const { refreshToken } = request.body;

    try {
      const result = await this.userServices.refreshToken(refreshToken);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
