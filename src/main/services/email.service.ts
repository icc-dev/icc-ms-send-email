import { LoggerService } from '@icc-dev/icc-log-service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { SendGridProvider } from 'src/providers/emails/sendgrid/sendgrid.provider';

@Injectable()
export class EmailService extends SendGridProvider {
    public readonly emailTo: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService
    ) {
        super(configService.get<string>('sendgrid.apiKey'), loggerService);
        this.emailTo = configService.get<string>('sendgrid.mailFrom');
    }

    async send(mail: SendGrid.MailDataRequired) {
        return super.send(mail);
    }
}