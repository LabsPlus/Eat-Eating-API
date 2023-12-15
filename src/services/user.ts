import { compare, hash } from 'bcrypt';
import { UserDAL } from '../database/data_access/user';
import { Email } from '../utils/email';
import { IUserAuth, IUserCreate } from '../intefaces/user';
import { sign, verify } from 'jsonwebtoken';
import { error } from 'console';
import dotenv from 'dotenv';
dotenv.config();

const { Link } = process.env;

class UserServices {
  private userDAL: UserDAL;
  private email: Email;

  constructor() {
    this.userDAL = new UserDAL();
    this.email = new Email();
  }

  async createUser({ email, password, emailRecovery }: IUserCreate) {
    const findUserByEmail = await this.userDAL.findUserByEmail(email);
    if (findUserByEmail) {
      throw new Error('User email already exists');
    }

    const passwordHash = await hash(password, 10);
    const result = await this.userDAL.createUser({
      email,
      password: passwordHash,
      emailRecovery,
    });

    return result;
  }

  async authUser({ email, password }: IUserAuth) {
    const findUserByEmail = await this.userDAL.findUserByEmail(email);
    if (!findUserByEmail) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await compare(password, findUserByEmail.password);
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
      subject: findUserByEmail.id.toString(),
      expiresIn: '60s',
    });

    const refreshToken = sign({ email }, secretKeyRefresh, {
      subject: findUserByEmail.id.toString(),
      expiresIn: '7d',
    });

    return {
      token: { token, expiresIn: '60s' },
      refreshToken: { refreshToken, expiresIn: '7d' },
      user: {
        email: findUserByEmail.email,
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

    const verifyRefreshToken = await verify(refreshToken, secretKeyRefresh);

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

  async updatePassword(newPassword: string, token: string): Promise<any> {
  const user = await this.userDAL.findUserByToken(token);
  if (!user) {
    throw new Error('There is no user with this token');
  }

  const now = new Date();

  // Verificar se o token expirou
  if (user.resetTokenExpiry && now > user.resetTokenExpiry) {
    throw new Error('Sorry the token expired');
  }

  const passwordHash = await hash(newPassword, 10);

  const result = await this.userDAL.updatePassword(passwordHash, user);
  return result;
}

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userDAL.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = await hash(email + Date.now(), 10);
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    const token = await this.userDAL.updateResetToken(resetToken, resetTokenExpiry, user);

    const resetLink = `${process.env.LINK || ''}/recuperacao-senha/${token}`;
    const sendEmail = await this.email.sendEmail(
      email,
      'Recuperação de senha',
      `Olá! Para resetar sua senha clique nesse link: ${resetLink}`,
    );

    if (!sendEmail) {
      throw new Error('Email not sent');
    }

    return sendEmail;
  }

}

export { UserServices };
