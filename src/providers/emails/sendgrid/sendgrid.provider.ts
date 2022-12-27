import { Injectable } from '@nestjs/common';
import { EmailDataDto } from '../dto/mail-data.dto';
import * as sgMail from '@sendgrid/mail';
import { LoggerService } from '@icc-dev/icc-log-service';
import { IEmailResponse, IEmailService } from '../interfaces/emails.interface';

@Injectable()
export class SendGridProvider implements IEmailService {
    private _emailFrom: string;
    constructor(apiKey: string, emailFrom: string, private logger: LoggerService) {
        sgMail.setApiKey(apiKey);
        this._emailFrom = emailFrom;
    }

    async send(mailData: EmailDataDto): Promise<IEmailResponse> {
        try {
            this.logger.log('[SendgridProvider:send] called with', mailData);
            const transport = await sgMail.send({...mailData, from: this._emailFrom} as sgMail.MailDataRequired);
            this.logger.log(`[SendgridProvider:send] mail sent to ${mailData.to}`);
            return {
                statusCode: transport[0].statusCode,
                body: transport[0].body,
            };
        } catch (error) {
            console.error('error', error)
            this.logger.error(`[SendgridProvider:send] error sending email to ${mailData.to}`)
            return Promise.reject(error);
        }
    }
}