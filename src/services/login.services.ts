import { compare, hash } from 'bcrypt';
import { LoginDALs } from '../database/data.access/login.dals';
import { EmailUtils } from '../utils/email.utils';
import {
  ILoginAuth,
  ILoginCreate,
  ILoginForgotPassword,
  ILoginUpdatePassword,
} from '../intefaces/login.interfaces';
import { RateLimitUtils } from '../utils/rateLimit.utils';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

const { Link } = process.env;

class LoginServices {
  private loginDALs: LoginDALs;
  private emailUtils: EmailUtils;
  private rateLimitUtils: RateLimitUtils;
  private invalidAttempts: Map<string, number>;

  constructor() {
    this.loginDALs = new LoginDALs();
    this.emailUtils = new EmailUtils();
    this.rateLimitUtils = new RateLimitUtils();
    this.invalidAttempts = new Map();
  }

  async createLogin({ email, password, emailRecovery }: ILoginCreate) {
    const findLoginByEmail = await this.loginDALs.findLoginByEmail(email);
    if (findLoginByEmail) {
      throw new Error('User email already exists');
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
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await compare(password, findLoginByEmail.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
    if (!secretKey) {
      throw new Error('There is no token key');
    }

    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
    if (!secretKeyRefresh) {
      throw new Error('There is no refresh token key');
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
      throw new Error('Refresh token missing');
    }
    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
    if (!secretKeyRefresh) {
      throw new Error('There is no refresh token key');
    }

    let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
    if (!secretKey) {
      throw new Error('There is no refresh token key');
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
      throw new Error('Token is Undefined');
    }
    const findLoginByToken = await this.loginDALs.findLoginByToken(token);
    if (!findLoginByToken) {
      throw new Error('There is no user with this token');
    }

    const now = new Date();

    if (
      findLoginByToken.resetTokenExpiry &&
      now > findLoginByToken.resetTokenExpiry
    ) {
      throw new Error('Sorry the token expired');
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
      throw new Error('Cannot find ip');
    }
    if (this.rateLimitUtils.verifyBlock(ip)) {
      throw new Error(
        'Too many requests. This IP has been blocked for 15 minutes',
      );
    }

    const findLoginByEmail = await this.loginDALs.findLoginByEmail(email);
    if (!findLoginByEmail) {
      const actualAttempts = this.invalidAttempts.get(ip) || 0;
      this.invalidAttempts.set(ip, actualAttempts + 1);

      if (actualAttempts + 1 === 3) {
        this.rateLimitUtils.blockIp(ip);
      }
      throw new Error('User not found');
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

    const resetLink = `${process.env.LINK || ''}/nova-senha?token=${
      token.resetToken
    }`;
    const sendEmail = await this.emailUtils.sendEmail({
      destination: findLoginByEmail.emailRecovery,
      subject: 'Recuperação de senha',
      content: `Clique aqui para redefinir sua senha `,
      link: resetLink,
    });

    if (!sendEmail) {
      throw new Error('Error send email');
    }

    return sendEmail;
  }
}

export { LoginServices };
