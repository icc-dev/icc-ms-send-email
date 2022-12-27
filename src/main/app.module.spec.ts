import { LoggerService } from '@icc-dev/icc-log-service';
import { CustomConfigModule } from '@config/custom-config.module';
import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';
import { EmailService } from './services/email.service';
import { ConfigService } from '@nestjs/config';
import { SendGridProvider } from '@providers/emails/sendgrid/sendgrid.provider';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, CustomConfigModule],
      providers: [
        {
            provide: EmailService,
            useFactory: async (loggerService: LoggerService) => {
              const provider = new SendGridProvider(
                'api-key',
                'mailFrom',
                loggerService
              );
              return new EmailService(provider);
            },
            inject: [ConfigService, LoggerService]
          }, 
        LoggerService]
    }).compile();
    expect(module).toBeDefined();
    expect(await module.resolve(LoggerService)).toBeInstanceOf(LoggerService);
    expect(await module.resolve(LoggerService)).toBeDefined();
    expect(await module.resolve(EmailService)).toBeInstanceOf(EmailService);
    expect(await module.resolve(EmailService)).toBeDefined();
  });
});