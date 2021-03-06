import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileEntity } from './entities/profile.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
