import { Module, Global } from '@nestjs/common';
import { CinGeneratorService } from './cin-generator/cin-generator.service';
import { MatriculeGeneratorService } from './matricule-ticket/matricule-generator.service';

@Global()
@Module({
  providers: [CinGeneratorService, MatriculeGeneratorService],
  exports: [CinGeneratorService, MatriculeGeneratorService],
})
export class HelpersModule {}
