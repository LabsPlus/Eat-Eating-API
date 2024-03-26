import { compare, hash } from 'bcrypt';
import { LoginDALs } from '../database/repositories/administrator.repositories/administator.dals/login.dals';
import { EmailUtils } from '../utils/email.utils';
import { HtmlMessages } from '../utils/htmlMessages.utils';
import {
  ILoginAuth,
  ILoginCreate,
  ILoginForgotPassword,
  ILoginUpdatePassword,
} from '../intefaces/login.interfaces';
import { RateLimitUtils } from '../utils/rate.limit.utils';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ErrorsHelpers } from '../helpers/errors.helpers';

dotenv.config();

const { Link } = process.env;

class AdministratorServices {
  private loginDALs: LoginDALs;
  private emailUtils: EmailUtils;
  private rateLimitUtils: RateLimitUtils;
  private invalidAttempts: Map<string, number>;
  private htmlMessages: HtmlMessages;

  constructor() {
    this.loginDALs = new LoginDALs();
    this.emailUtils = new EmailUtils();
    this.rateLimitUtils = new RateLimitUtils();
    this.invalidAttempts = new Map();
    this.htmlMessages = new HtmlMessages();
  }

  async createLogin({ email, password, emailRecovery }: ILoginCreate) {
    const findLoginByEmail =
      await this.loginDALs.findLoginByEmailOREmailRecovery(
        email,
        emailRecovery,
      );
    if (findLoginByEmail) {
      throw new ErrorsHelpers({
        message:
          'Email or Email Recovery already exists, only one email is allowed.',
        statusCode: 401,
      });
    }

    const passwordHash = await hash(password, 10);
    const result = await this.loginDALs.createLogin({
      email,
      password: passwordHash,
      emailRecovery,
    });

    return result;
  }

  async authLogin({ email, password }: ILoginAuth) {
    const findLoginByEmail = await this.loginDALs.findLoginByEmail(email);
    if (!findLoginByEmail) {
      throw new ErrorsHelpers({
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    const passwordMatch = await compare(password, findLoginByEmail.password);
    if (!passwordMatch) {
      throw new ErrorsHelpers({
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
    if (!secretKey) {
      throw new ErrorsHelpers({
        message: 'There is no token key',
        statusCode: 401,
      });
    }

    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
    if (!secretKeyRefresh) {
      throw new ErrorsHelpers({
        message: 'There is no refresh token key',
        statusCode: 401,
      });
    }

    const token = sign({ email }, secretKey, {
      subject: findLoginByEmail.id.toString(),
      expiresIn: '60s',
    });

    const refreshToken = sign({ email }, secretKeyRefresh, {
      subject: findLoginByEmail.id.toString(),
      expiresIn: '7d',
    });

    return {
      token: { token, expiresIn: '60s' },
      refreshToken: { refreshToken, expiresIn: '7d' },
      user: {
        email: findLoginByEmail.email,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new ErrorsHelpers({
        message: 'Refresh token missing',
        statusCode: 401,
      });
    }
    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
    if (!secretKeyRefresh) {
      throw new ErrorsHelpers({
        message: 'There is no refresh token key',
        statusCode: 401,
      });
    }

    let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
    if (!secretKey) {
      throw new ErrorsHelpers({
        message: 'There is no refresh token key',
        statusCode: 401,
      });
    }

    const verifyRefreshToken = verify(refreshToken, secretKeyRefresh);

    const { sub } = verifyRefreshToken;

    const newToken = sign({ sub }, secretKey, {
      expiresIn: '1h',
    });
    const newRefreshToken = sign({ sub }, secretKeyRefresh, {
      expiresIn: '7d',
    });
    return {
      token: { token: newToken, expiresIn: '1h' },
      refreshToken: { refreshToken: newRefreshToken, expiresIn: '7d' },
    };
  }

  async updatePassword({ newPassword, token }: ILoginUpdatePassword) {
    if (token === undefined) {
      throw new ErrorsHelpers({
        message: 'Token is Undefined',
        statusCode: 401,
      });
    }
    const findLoginByToken = await this.loginDALs.findLoginByToken(token);
    if (!findLoginByToken) {
      throw new ErrorsHelpers({
        message: 'There is no user.repositories with this token',
        statusCode: 401,
      });
    }

    const now = new Date();

    if (
      findLoginByToken.resetTokenExpiry &&
      now > findLoginByToken.resetTokenExpiry
    ) {
      throw new ErrorsHelpers({
        message: 'Sorry the token expired',
        statusCode: 401,
      });
    }

    const passwordHash = await hash(newPassword, 10);

    const result = await this.loginDALs.updatePassword({
      newPassword: passwordHash,
      email: findLoginByToken.email,
    });
    return result;
  }

  async forgotPassword({ email, ip }: ILoginForgotPassword) {
    if (ip === undefined) {
      throw new ErrorsHelpers({ message: 'Cannot find ip', statusCode: 401 });
    }
    if (this.rateLimitUtils.verifyBlock(ip)) {
      throw new ErrorsHelpers({
        message: 'Too many requests. This IP has been blocked for 15 minutes',
        statusCode: 401,
      });
    }

    const findLoginByEmail = await this.loginDALs.findLoginByEmail(email);
    if (!findLoginByEmail) {
      const actualAttempts = this.invalidAttempts.get(ip) || 0;
      this.invalidAttempts.set(ip, actualAttempts + 1);

      if (actualAttempts + 1 === 3) {
        this.rateLimitUtils.blockIp(ip);
      }
      throw new ErrorsHelpers({ message: 'User not found', statusCode: 401 });
    }

    const resetToken = await hash(
      findLoginByEmail.emailRecovery + Date.now(),
      10,
    );
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    const token = await this.loginDALs.updateResetToken({
      resetToken,
      resetTokenExpiry,
      email: findLoginByEmail.email,
    });

    const resetLink = `${
      process.env.FRONTEND_URL_DEV || process.env.FRONTEND_URL_MAIN
    }/nova-senha?token=${token.resetToken}`;
    const sendEmail = await this.emailUtils.sendEmail({
      destination: findLoginByEmail.emailRecovery,
      subject: 'Recuperação de senha',
      content: this.htmlMessages.forgotPasswordMessage(resetLink),
    });

    if (!sendEmail) {
      throw new ErrorsHelpers({ message: 'Error send email', statusCode: 401 });
    }

    return sendEmail;
  }
}

export { AdministratorServices };
