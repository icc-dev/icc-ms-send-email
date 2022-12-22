import { CustomConfigModule } from './../custom-config/custom-config.module';
import { LoggerService } from '@icc-dev/icc-log-service';
import { EmailService } from './services/email.service';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';

@Module({
  imports: [CustomConfigModule],
  controllers: [AppController],
  providers: [EmailService, LoggerService],
})
export class AppModule {}
