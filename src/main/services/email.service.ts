import {
  IEmailService,
  IEmailResponse,
} from '@providers/emails/interfaces/emails.interface';
import { Injectable } from '@nestjs/common';
import { EmailDataDto } from '@providers/emails/dto/mail-data.dto';

@Injectable()
export class EmailService {
  constructor(public emailProvider: IEmailService) {}

  async send(mail: EmailDataDto): Promise<IEmailResponse> {
    return this.emailProvider.send(mail);
  }
}
