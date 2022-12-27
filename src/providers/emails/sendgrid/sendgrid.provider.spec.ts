import { LoggerService } from '@icc-dev/icc-log-service';
import { Test, TestingModule } from '@nestjs/testing';
import { SendGridProvider } from './sendgrid.provider';
import * as sgMail from '@sendgrid/mail';

describe('SendGridProvider', () => {
  let provider: SendGridProvider;

  jest.spyOn(sgMail, 'setApiKey');

  let loggerService = {
    log: (message: string, additionalData: any) => {
      console.log(message, additionalData);
    },
    error: (message: string, additionalData: any) => {
      console.error(message, additionalData);
    },
    warn: (message: string, additionalData: any) => {
      console.warn(message, additionalData);
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SendGridProvider,
          useFactory: () => {
            return new SendGridProvider(
              'apyKey',
              'email@email.com',
              loggerService,
            );
          },
        },
        LoggerService,
      ],
    }).compile();

    provider = module.get<SendGridProvider>(SendGridProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should setApiKey called', async () => {
    jest.spyOn(sgMail, 'send').mockResolvedValue([
      {
        statusCode: 202,
        body: {},
      },
    ] as any);
    await provider.send({} as any);
    expect(sgMail.setApiKey).toBeCalled();
  });

  it('should sgMail.send called', async () => {
    jest.spyOn(sgMail, 'send').mockResolvedValue([
      {
        statusCode: 202,
        body: {},
      },
    ] as any);
    await provider.send({} as any);
    expect(sgMail.send).toBeCalled();
  });

  it('should sgMail.send called', async () => {
    jest.spyOn(sgMail, 'send').mockRejectedValue('Empty body');

    await provider.send({} as any).catch((error) => {
      expect(sgMail.send).toBeCalled();
      expect(error).toEqual('Empty body');
    });
  });
});
