import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';
import { mail_queue_name } from 'src/utils';
import { MailService } from './services/mail.service';
import { MailProcessor } from './services/mail.processor';
import { RedisModule } from '@svtslv/nestjs-ioredis';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT, 10),
          //secure: process.env.MAIL_SECURE,
          // tls: { ciphers: 'SSLv3', }, // gmail
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: process.env.MAIL_FROM,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: mail_queue_name,
      useFactory: () => ({
        prefix: '_',
        RedisModule,
        /* redis: {
          //host: process.env.REDIS_HOST,
          //port: +process.env.REDIS_PORT,
        },*/
      }),
    }),
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
