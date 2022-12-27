import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let provider: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmailService,
          useFactory: () => {
            return new EmailService({
              send: jest.fn(),
            });
          },
        },
      ],
    }).compile();

    provider = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should send called one time', async () => {
    await provider.send({} as any);
    expect(provider.emailProvider.send).toBeCalledTimes(1);
  });
});
