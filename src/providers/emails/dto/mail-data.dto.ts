export class EmailDataDto {
  templateId: string;
  to?: string;
  payLoad?: any;
  cc?: string[];
  bcc?: string[];
  dynamicTemplateData?: { [key: string]: any };
  attachment?: {
    content: string;
    filename: string;
    type?: string;
  };
}
