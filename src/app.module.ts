import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpersModule } from './helpers/helpers.module';
import { ConfigModule } from '@nestjs/config';
import { FirstMiddleware } from './config/middleware/middleware';
import { logger } from './config/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumModule } from './curriculum/curriculum.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { ProfileModule } from './profile/profile.module';
import { TicketModule } from './ticket/ticket.module';
import { WikiModule } from './wiki/wiki.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';

import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';
import { LoggerModule } from './logger/logger.module';

dotenv.config();

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    HelpersModule,
    AuthModule,
    LoggerModule,
    CurriculumModule,
    UserModule,
    ProfileModule,
    ClientModule,
    TicketModule,
    WikiModule,
    MailModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      //subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      synchronize: true, //Don't use it in Prod
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      // eslint-disable-next-line prettier/prettier
      .apply(FirstMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET })
      // eslint-disable-next-line prettier/prettier
      .apply(logger)
      .forRoutes('');
  }
}
