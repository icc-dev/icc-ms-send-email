import { RpcException } from "@nestjs/microservices";
import { EmailDataDto } from "@providers/emails/dto/mail-data.dto";

export function validationData(data: EmailDataDto) {
    if (!data || Object.keys(data).length === 0) {
        throw new RpcException(`Does't provide email data`);
    }
    if (!data.templateId) {
        throw new RpcException(`Does't provide templateId`);
    } 
    if (!data.to) {
        throw new RpcException(`Does't provide to email addresse`);
    }
    if (data.attachment && (!data.attachment.content || !data.attachment.content.length || !data.attachment.filename)) {
        throw new RpcException(`Receive attachment without content or filename`);
    }
}