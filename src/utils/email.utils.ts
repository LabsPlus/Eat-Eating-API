require('dotenv').config();
import * as nodemailer from 'nodemailer';
import { ISendEmail } from '../intefaces/email.interfaces';

class EmailUtils {
  constructor() {}

  async sendEmail({ destination, subject, content, link }: ISendEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: destination,
        subject: subject,
        html: `<a href="${link}" style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#fff;text-decoration:none;border-radius:5px;"> ${content}</a>`,
      };

      const info = await transporter.sendMail(mailOptions);
      transporter.close();
      return `E-mail sent with success ${info.response}`;
    } catch (error) {
      throw new Error('email not sended');
    }
  }
}

export { EmailUtils };
