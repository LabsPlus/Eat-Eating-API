require('dotenv').config();
import * as nodemailer from 'nodemailer';
import { ISendEmail } from '../intefaces/email.interfaces';

class EmailUtils {
  constructor() {}

  async sendEmail({ destination, subject, content }: ISendEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: parseInt(process.env.SMTP_PORT!),
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: destination,
        subject: subject,
        html: content,
      };

      const info = await transporter.sendMail(mailOptions);
      transporter.close();
      return `E-mail sent with success ${info.response}`;
    } catch (error) {
      console.log(error);
      throw new Error('email not sended');
    }
  }
  
}

export { EmailUtils };
