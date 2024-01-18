import { NextFunction, Request, Response } from 'express';
import { UsersServices } from '../services/users.services';

class UsersController {
  private usersServices: UsersServices;

  constructor() {
    this.usersServices = new UsersServices();
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { email, password, emailRecovery } = request.body;
    try {
      const result = await this.usersServices.createUser({
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
      const result = await this.usersServices.authUser({ email, password });

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const { refreshToken } = request.body;

    try {
      const result = await this.usersServices.refreshToken(refreshToken);

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }

  async updatePassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { newPassword, token } = request.body;
    try {
      const result = await this.usersServices.updatePassword({newPassword, token});

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);
      return response.status(401).json(error.message);
    }
  }
  async forgotPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { email } = request.body;
    try {
      const ip = request.ip;
      const result = await this.usersServices.forgotPassword({email, ip});
      return response.status(200).json(result);
    } catch (error: any) {
      next(error);
      return response.status(401).json(error.message);
    }
  }
}

export { UsersController };
