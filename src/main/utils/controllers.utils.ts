import { RpcException } from "@nestjs/microservices";
import { EmailDataDto } from "../dto/mail-data.dto";

export function validationData(data: EmailDataDto) {
    if (!data?.templateId) {
        throw new RpcException(`Does't provide templateId`);
    } 
    if (!data?.to) {
        throw new RpcException(`Does't provide to email addresse`);
    }
    if (!data?.attachment?.content?.length || !data?.attachment?.filename) {
        throw new RpcException(`Receive attachment without content or filename`);
    }
}