import * as nodemailer from 'nodemailer';
import {EmailUtils} from '../utils/email.utils';

jest.mock('nodemailer');

describe('Email', () => {
    let email: EmailUtils;

    beforeEach(() => {
        email = new EmailUtils();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should send an email successfully', async () => {
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue({
            sendMail: jest.fn().mockResolvedValue({response: 'Mocked success'}),
            close: jest.fn(),
        } as any);

        const result = await email.sendEmail({
            destination: 'example@example.com',
            subject: 'Subject',
            content: 'Content',
        });

        expect(nodemailer.createTransport).toHaveBeenCalledWith({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });

        expect(result).toBe('E-mail sent with success Mocked success');
    });

    it('should throw an error if the email is not sent successfully', async () => {
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue({
            sendMail: jest.fn().mockRejectedValue(new Error('Mocked failure')),
            close: jest.fn(),
        } as any);

        await expect(email.sendEmail({
            destination: 'example@example.com',
            subject: 'Subject',
            content: 'Content',
        })).rejects.toThrow('email not sended');

        expect(nodemailer.createTransport).toHaveBeenCalledWith({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });
    });
});
