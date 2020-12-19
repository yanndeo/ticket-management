import { Module, Global } from '@nestjs/common';
import { CinGeneratorService } from './cin-generator/cin-generator.service';
import { MatriculeGeneratorService } from './matricule-ticket/matricule-generator.service';
import { UploadableService } from './uploadable/uploadable.service';

@Global()
@Module({
  providers: [
    CinGeneratorService,
    MatriculeGeneratorService,
    UploadableService,
  ],
  exports: [CinGeneratorService, MatriculeGeneratorService, UploadableService],
})
export class HelpersModule {}
