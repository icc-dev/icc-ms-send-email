import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { EmailDataDto } from '../dto/mail-data.dto';
import { EmailService } from '../services/email.service';
import { validationData } from '../utils/controllers.utils';

@Controller()
export class AppController {
  constructor(private readonly emailSrvc: EmailService) {}

  @MessagePattern({ cmd: 'send_email' })
  async handlerSendEmail(data: EmailDataDto) {
    validationData(data);
    const dataMail = {
      templateId: ''+data.templateId,
      from: this.emailSrvc.emailTo,
      to: ''+data.to,
      dynamicTemplateData: data.dynamicTemplateData,
      attachment: data.attachment
    };
    return await this.emailSrvc.send(dataMail);
  }

  
}
