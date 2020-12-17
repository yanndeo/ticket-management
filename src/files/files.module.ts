import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';

@Module({
  controllers: [FilesController],
})
export class FilesModule {}
