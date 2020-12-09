import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  index(): string {
    console.log('PORT:', this.configService.get('APP_PORT'));
    return 'Hello God';
  }
}
