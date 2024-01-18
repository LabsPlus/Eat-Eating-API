import { compare, hash } from 'bcrypt';
import { UsersDALs } from '../database/data_access/users.dals';
import { EmailUtils } from '../utils/email.utils';
import { IUsersAuth, IUsersCreate, IUserForgotPassword, IUsersUpdatePassword } from '../intefaces/users.interfaces';
import { RateLimitUtils} from '../utils/rateLimit.utils'
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

const { Link } = process.env;

class UsersServices {
  private usersDALs: UsersDALs;
  private emailUtils: EmailUtils;
  private rateLimitUtils: RateLimitUtils;
  private invalidAttempts: Map<string, number>;
  
  constructor() {
    this.usersDALs = new UsersDALs();
    this.emailUtils = new EmailUtils();
    this.rateLimitUtils = new RateLimitUtils();
    this.invalidAttempts = new Map();
  }

  async createUser({ email, password, emailRecovery }: IUsersCreate) {
    const findUserByEmail = await this.usersDALs.findUserByEmail(email);
    if (findUserByEmail) {
      throw new Error('User email already exists');
    }

    const passwordHash = await hash(password, 10);
    const result = await this.usersDALs.createUser({
      email,
      password: passwordHash,
      emailRecovery,
    });

    return result;
  }

  async authUser({ email, password }: IUsersAuth) {
    const findUserByEmail = await this.usersDALs.findUserByEmail(email);
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

  async updatePassword({newPassword, token}: IUsersUpdatePassword){
    if(token === undefined){
      throw new Error('Token is Undefined')
    }
    const user = await this.usersDALs.findUserByToken(token);
    if (!user) {
      throw new Error('There is no user with this token');
    }

    const now = new Date();

    // Verificar se o token expirou
    if (user.resetTokenExpiry && now > user.resetTokenExpiry) {
      throw new Error('Sorry the token expired');
    }

    const passwordHash = await hash(newPassword, 10);

    const result = await this.usersDALs.updatePassword(passwordHash, user);
    return result;
  }

  async forgotPassword({email, ip}: IUserForgotPassword) {

    if(ip === undefined){
      throw new Error('Cannot find ip');
    }
    if(this.rateLimitUtils.verifyBlock(ip)){
      throw new Error('Too many requests. This IP has been blocked for 15 minutes')
    }
   
    const user = await this.usersDALs.findUserByEmail(email);
    if (!user) {
      const actualAttempts = this.invalidAttempts.get(ip) || 0;
      this.invalidAttempts.set(ip, actualAttempts + 1);

      if(actualAttempts + 1 === 3){
          this.rateLimitUtils.blockIp(ip);
      }
      throw new Error('User not found');
    }
    

    const resetToken = await hash(user.emailRecovery + Date.now(), 10);
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    const token = await this.usersDALs.updateResetToken(
      resetToken,
      resetTokenExpiry,
      user,
    );

    const resetLink = `${process.env.LINK || ''}/nova-senha?token=${token}`;
    const sendEmail = await this.emailUtils.sendEmail({
      destination: user.emailRecovery,
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

export { UsersServices };
