import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const mailerConfig: MailerOptions = {
    transport: {
        host: process.env.STMP_HOST,
        port: Number(process.env.STMP_PORT), 
        secure: false, 
        auth: {
            user: process.env.STMP_EMAIL,
            pass: process.env.STMP_PASSWORD,
        },
    },
    defaults: {
        from: '"Co Dung" <no-reply@example.com>',
    },
    template: {
        dir: path.join(__dirname, '..', '..', '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
};
