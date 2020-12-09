import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ContactController } from './contact.controller';
import { ClientEntity } from './entities/client.entity';
import { ContactEntity } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contact.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ContactEntity]),
    UserModule,
  ],
  controllers: [ClientController, ContactController],
  providers: [ClientService, ContactService],
  exports: [ClientService],
})
export class ClientModule {}
