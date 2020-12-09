import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { CurriculumEntity } from './entities/curriculum.entity';
import { CurriculumSubscriber } from './subscribers/curriculum.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([CurriculumEntity]), UserModule],
  controllers: [CurriculumController],
  providers: [CurriculumService, CurriculumSubscriber],
})
export class CurriculumModule {}
