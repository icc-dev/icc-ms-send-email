import { CustomConfigModule } from './custom-config.module';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('CustomConfigModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [CustomConfigModule],
      providers: [ConfigService]
    }).compile();
    expect(module).toBeDefined();
  });
});