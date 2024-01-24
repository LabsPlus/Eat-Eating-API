import { NextFunction, Request, Response } from 'express';
import { LoginServices } from '../services/login.services';

class LoginController {
  private loginServices: LoginServices;

  constructor() {
    this.loginServices = new LoginServices();
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { email, password, emailRecovery } = request.body;
    try {
      const result = await this.loginServices.createLogin({
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
      const result = await this.loginServices.authLogin({ email, password });

      return response.status(200).json(result);
    } catch (error: any) {
      next(error);

      return response.status(401).json(error.message);
    }
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const { refreshToken } = request.body;

    try {
      const result = await this.loginServices.refreshToken(refreshToken);

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
      const result = await this.loginServices.updatePassword({
        newPassword,
        token,
      });

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
      const ip =
        request.socket.remoteAddress ||
        request.socket.remoteAddress ||
        request.socket.remoteAddress;
      const result = await this.loginServices.forgotPassword({ email, ip });
      return response.status(200).json(result);
    } catch (error: any) {
      next(error);
      return response.status(401).json(error.message);
    }
  }
}

export { LoginController };
