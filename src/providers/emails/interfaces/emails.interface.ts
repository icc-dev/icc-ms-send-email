import { EmailDataDto } from '../dto/mail-data.dto';
export interface IEmailService {
  send(data: EmailDataDto): Promise<IEmailResponse>;
}

export interface IEmailResponse {
  statusCode: number;
  body: any;
}
