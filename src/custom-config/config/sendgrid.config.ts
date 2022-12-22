import { registerAs } from '@nestjs/config';

export default registerAs('sendgrid', () => ({
    apiKey: process.env.SENDGRID_API_KEY || 'SENDGRID_API_KEY',
    mailFrom: process.env.SENDGRID_FROM || 'dev-icc@no-reply.com',
}));
