    import { Injectable } from '@nestjs/common';
    import { MailerService } from '@nestjs-modules/mailer';

    @Injectable()
    export class AppMailerService {
        constructor(private readonly mailerService: MailerService) {}

        async sendUserConfirmation(user: { email: string, token: string }): Promise<void> {
            const url = `http://localhost:3000/auth/confirm?token=${user.token}`;// URL để xác nhận email

            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Minastik - Please Confirm Your Email',
                template: './confirmation',
                context: { // Dữ liệu sẽ được gửi đến template
                    name: user.email, 
                    url,
                },
            });
        }
    }
