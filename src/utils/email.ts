require('dotenv').config();
import * as nodemailer from 'nodemailer';

class Email {
  constructor() {}

  async sendEmail(destination: string, subject: string, content: string) {
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
        text: content,
      };

      const info = await transporter.sendMail(mailOptions);
      transporter.close();
      return `E-mail sent with success ${info.response}`;
    } catch (error) {
      throw new Error('email not sended');
    }
  }
}

export { Email };
