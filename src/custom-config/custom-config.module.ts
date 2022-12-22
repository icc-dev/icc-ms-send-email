import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

// config files
import sendrig from './config/sendgrid.config';

const configModule = ConfigModule.forRoot({
    load: [sendrig]
});

@Module({
    imports: [configModule],
    exports: [configModule, ConfigService],
    providers: [ConfigService]
})
export class CustomConfigModule { }
