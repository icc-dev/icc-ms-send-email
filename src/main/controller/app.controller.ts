import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { HttpCode, Version } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { EmailDataDto } from '@providers/emails/dto/mail-data.dto';
import { EmailService } from '../services/email.service';
import { validationData } from '../utils/controllers.utils';

@Controller()
export class AppController {
  constructor(private readonly emailSrvc: EmailService) {}

  @Post('send')
  @Version('1')
  async handlerSendEmail(@Body() data: EmailDataDto) {
    try {
      validationData(data);
      let dataMail = { ...data };
      return await this.emailSrvc.send(dataMail);
    } catch (error) {
      return new HttpException(
        "message", 
        HttpStatus.INTERNAL_SERVER_ERROR, 
        { cause: error })
    }
  }
}
