import { NextFunction, Request, Response } from 'express';
import { LoginServices } from '../services/login.services';

class LoginControllers {
  private loginServices: LoginServices;

  constructor() {
    this.loginServices = new LoginServices();
  }

  async createLogin(request: Request, response: Response, next: NextFunction) {
    const { email, password, emailRecovery } = request.body;
    const result = await this.loginServices.createLogin({
      email,
      password,
      emailRecovery,
    });

    return response.status(201).json(result);
  }

  async authLogin(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    const result = await this.loginServices.authLogin({ email, password });

    return response.status(200).json(result);
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const { refreshToken } = request.body;

    const result = await this.loginServices.refreshToken(refreshToken);

    return response.status(200).json(result);
  }

  async updatePassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { newPassword, token } = request.body;

    const result = await this.loginServices.updatePassword({
      newPassword,
      token,
    });

    return response.status(200).json(result);
  }

  async forgotPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { email } = request.body;
    const ip =
      request.clientIp;

    const result = await this.loginServices.forgotPassword({ email, ip });

    return response.status(200).json(result);
  }
}

export { LoginControllers };
