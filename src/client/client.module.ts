import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { ContactController } from './controllers/contact.controller';
import { ClientEntity } from './entities/client.entity';
import { ContactEntity } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './services/contact.service';
import { UserModule } from 'src/user/user.module';
import { PartnerService } from './services/partner.service';
import { PartnerController } from './controllers/partner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, ContactEntity]),
    UserModule,
  ],
  controllers: [ClientController, ContactController, PartnerController],
  providers: [ClientService, ContactService, PartnerService],
  exports: [ClientService],
})
export class ClientModule {}
