import { RpcException } from '@nestjs/microservices';
import { SendGridProvider } from '@providers/emails/sendgrid/sendgrid.provider';
import { LoggerService } from '@icc-dev/icc-log-service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './../services/email.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

const responseSend = {
  statusCode: 202,
  body: {},
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: EmailService,
          useFactory: async (loggerService: LoggerService) => {
            const provider = new SendGridProvider(
              'api-key',
              'from@email.com',
              loggerService,
            );
            return new EmailService(provider);
          },
          inject: [LoggerService],
        },
        LoggerService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({
        send: jest.fn().mockResolvedValue(responseSend),
      })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('defined', () => {
    it('Service defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('create email dto with error', () => {
    it(`Should return error Does't provide templateId`, async () => {
      await appController
        .handlerSendEmail({
          templateId: null,
        })
        .catch((error) => {
          expect(error.error).toEqual(`Does't provide templateId`);
        });
    });
    it(`Should return error Does't provide to email addresse`, async () => {
      await appController
        .handlerSendEmail({
          templateId: 'id',
          to: null,
        })
        .catch((error) => {
          expect(error.error).toEqual(`Does't provide to email addresse`);
        });
    });
    describe('Should return error Receive attachment without content or filename', () => {
      it(`Attachment empty`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {} as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });
      it(`Attachment content length 0`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {
              content: '',
            } as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });
      it(`Attachment content null`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {
              content: null,
            } as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });
      it(`Attachment with content and without filename`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {
              content: 'hola',
            } as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });
      it(`Attachment with content and with filename null`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {
              content: 'hola',
              filename: null,
            } as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });

      it(`Attachment with content and with filename empty`, async () => {
        await appController
          .handlerSendEmail({
            templateId: 'id',
            to: 'to@email.com',
            attachment: {
              content: 'hola',
              filename: '',
            } as any,
          })
          .catch((error) => {
            expect(error.error).toEqual(
              `Receive attachment without content or filename`,
            );
          });
      });
    });
  });

  it(`Should return 202`, async () => {
    const response = await appController.handlerSendEmail({
      templateId: 'id',
      to: 'to@email.com',
      attachment: {
        content: 'hola',
        filename: 'hola.txt',
      } as any,
    });
    expect(response).toEqual(responseSend);
  });
});
