import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { EmailDataDto } from '@providers/emails/dto/mail-data.dto';
import { EmailService } from '../services/email.service';
import { validationData } from '../utils/controllers.utils';

@Controller()
export class AppController {
  constructor(private readonly emailSrvc: EmailService) {}

  @MessagePattern({ cmd: 'send_email' })
  async handlerSendEmail(data: EmailDataDto) {
    validationData(data);
    let dataMail = { ...data };
    return await this.emailSrvc.send(dataMail);
  }
}
