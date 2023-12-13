import { compare, hash } from 'bcrypt';
import { UserDAL } from '../database/data_access/user';
import { IUserAuth, IUserCreate } from '../intefaces/user';
import { sign, verify } from 'jsonwebtoken';

class UserServices {
  private userDAL: UserDAL;

  constructor() {
    this.userDAL = new UserDAL();
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
}

export { UserServices };
