import { Module } from '@nestjs/common';
import { LoggingService } from './services/logging.service';
import { LoggingController } from './controllers/logging.controller';

@Module({
  providers: [LoggingService],
  controllers: [LoggingController]
})
export class LoggingModule {}
