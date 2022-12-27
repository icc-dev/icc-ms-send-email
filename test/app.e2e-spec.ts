import { EmailService } from './../src/main/services/email.service';
import { AppModule } from './../src/main/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          { name: 'EMAIL_SERVICE', transport: Transport.TCP },
        ]),
      ],
    })
      .overrideProvider(EmailService)
      .useValue({
        send: jest.fn().mockResolvedValue({
          statusCode: 202,
          body: {},
        }), // prevent use real service
      })
      .compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('EMAIL_SERVICE');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it(`Showld return Does't provide email data`, (done) => {
    const response: Observable<any> = client.send(
      { cmd: 'send_email' },
      {},
    );

    response.subscribe({
      error: (e) => {
        expect(e.message).toBe(`Does't provide email data`);
        expect(e.status).toBe('error');
        done();
      },
    });
  });
  it('Showld return statusCode 202', (done) => {
    const response: Observable<any> = client.send(
      { cmd: 'send_email' },
      {
        templateId: 'id',
        to: 'to@email.com',
        attachment: {
          content: 'hola',
          filename: 'hola.txt',
        } as any,
      },
    );

    response.subscribe({
      next: (v) => {
        expect(v.statusCode).toBe(202);
        done();
      },
      error: (e) => {
        expect(e).not.toBeDefined();
        done();
      },
    });
  });
  it(`Showld return Does't provide templateId`, (done) => {
    const response: Observable<any> = client.send(
      { cmd: 'send_email' },
      {
        to: 'to@email.com',
        attachment: {
          content: 'hola',
          filename: 'hola.txt',
        } as any,
      },
    );
    response.subscribe({
      error: (e) => {
        expect(e.message).toBe(`Does't provide templateId`);
        expect(e.status).toBe('error');
        done();
      },
      next: (v) => {
        expect(v).not.toBeDefined();
        done();
      },
    });
  });
  it(`Showld return Does't provide to email addresse`, (done) => {
    const response: Observable<any> = client.send(
      { cmd: 'send_email' },
      {
        templateId: 'aa',
        attachment: {
          content: 'hola',
          filename: 'hola.txt',
        } as any,
      },
    );
    response.subscribe({
      error: (e) => {
        expect(e.message).toBe(`Does't provide to email addresse`);
        expect(e.status).toBe('error');
        done();
      },
      next: (v) => {
        expect(v).not.toBeDefined();
        done();
      },
    });
  });
  describe('Showld return Receive attachment without content or filename', () => {
    it(`when attachment is empty`, (done) => {
      const response: Observable<any> = client.send(
        { cmd: 'send_email' },
        {
          templateId: 'aa',
          to: 'to@email.com',
          attachment: {},
        },
      );
      response.subscribe({
        error: (e) => {
          expect(e.message).toBe(
            `Receive attachment without content or filename`,
          );
          expect(e.status).toBe('error');
          done();
        },
        next: (v) => {
          expect(v).not.toBeDefined();
          done();
        },
      });
    });
    describe('when attachment content property', () => {
      it(`is null`, (done) => {
        const response: Observable<any> = client.send(
          { cmd: 'send_email' },
          {
            templateId: 'aa',
            to: 'to@email.com',
            attachment: {
              content: null,
              filename: 'file.txt',
            },
          },
        );
        response.subscribe({
          error: (e) => {
            expect(e.message).toBe(
              `Receive attachment without content or filename`,
            );
            expect(e.status).toBe('error');
            done();
          },
          next: (v) => {
            expect(v).not.toBeDefined();
            done();
          },
        });
      });
      it(`is empty`, (done) => {
        const response: Observable<any> = client.send(
          { cmd: 'send_email' },
          {
            templateId: 'aa',
            to: 'to@email.com',
            attachment: {
              content: '',
              filename: 'file.txt',
            },
          },
        );
        response.subscribe({
          error: (e) => {
            expect(e.message).toBe(
              `Receive attachment without content or filename`,
            );
            expect(e.status).toBe('error');
            done();
          },
          next: (v) => {
            expect(v).not.toBeDefined();
            done();
          },
        });
      });
    });
    describe('when attachment filename property', () => {
      it(`is null`, (done) => {
        const response: Observable<any> = client.send(
          { cmd: 'send_email' },
          {
            templateId: 'aa',
            to: 'to@email.com',
            attachment: {
              content: 'content',
              filename: null,
            },
          },
        );
        response.subscribe({
          error: (e) => {
            expect(e.message).toBe(
              `Receive attachment without content or filename`,
            );
            expect(e.status).toBe('error');
            done();
          },
          next: (v) => {
            expect(v).not.toBeDefined();
            done();
          },
        });
      });
      it(`is empty`, (done) => {
        const response: Observable<any> = client.send(
          { cmd: 'send_email' },
          {
            templateId: 'aa',
            to: 'to@email.com',
            attachment: {
              content: 'content',
              filename: '',
            },
          },
        );
        response.subscribe({
          error: (e) => {
            expect(e.message).toBe(
              `Receive attachment without content or filename`,
            );
            expect(e.status).toBe('error');
            done();
          },
          next: (v) => {
            expect(v).not.toBeDefined();
            done();
          },
        });
      });
    });
  });
});
