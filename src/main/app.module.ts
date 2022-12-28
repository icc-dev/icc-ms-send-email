import { ConfigService } from '@nestjs/config';
import { SendGridProvider } from '@providers/emails/sendgrid/sendgrid.provider';
import { CustomConfigModule } from '@config/custom-config.module';
import { LoggerService } from '@icc-dev/icc-log-service';
import { EmailService } from './services/email.service';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';

@Module({
  imports: [CustomConfigModule],
  controllers: [AppController],
  providers: [
    {
      provide: EmailService,
      useFactory: async (
        configService: ConfigService,
        loggerService: LoggerService,
      ) => {
        const provider = new SendGridProvider(
          configService.get<string>('sendgrid.apiKey'),
          configService.get<string>('sendgrid.mailFrom'),
          loggerService,
        );
        return new EmailService(provider);
      },
      inject: [ConfigService, LoggerService],
    },
    LoggerService,
  ],
})
export class AppModule {}
