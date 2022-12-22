import * as sgMail from '@sendgrid/mail';
import { LoggerService } from '@icc-dev/icc-log-service';

export class SendGridProvider {
    constructor(apiKey: string, public logger: LoggerService) {
        console.log('apiKey', apiKey)
        sgMail.setApiKey(apiKey);
    }

    async send(mailData: sgMail.MailDataRequired): Promise<[sgMail.ClientResponse, {}]> {
        try {
            this.logger.log('[SendgridProvider:send] called with', mailData);
            const transport = await sgMail.send(mailData);
            this.logger.log(`[SendgridProvider:send] mail sent to ${mailData.to}`);
            return transport;
        } catch (error) {
            this.logger.error(`[SendgridProvider:send] error sending email to ${mailData.to}`)
            return Promise.reject(error);
        }
    }
}