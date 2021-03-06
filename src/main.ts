import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { json } from 'body-parser';

import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './logger/services/mylogger.service';

dotenv.config();

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //logger: false,
  });
  // custom logger
  app.useLogger(app.get(MyLogger));

  //use .env variable
  const configService = app.get(ConfigService);

  app.useStaticAssets(
    join(__dirname, '..', configService.get('UPLOAD_LOCATION')),
  );
  app.setGlobalPrefix(configService.get('APP_PREFIX'));
  app.use(json({ limit: '70mb' }));
  //app.enableShutdownHooks(); enabled and send mail to admin on "OnApplicationShutdown" event

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //enable cors for domain
  const corsOptions = {
    origin: ['http://localhost:4200'],
  };

  //app.enableCors(corsOptions);
  app.enableCors();

  //logger all request route with morgan
  app.use(morgan('dev'));

  //config swagger
  const options = new DocumentBuilder()
    .setTitle('Ticket Management ')
    .setDescription('CRM API description')
    .setVersion('1.0')
    .addTag('ticket')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //config validationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
