import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './services/ticket.service';
import { TicketController } from './controllers/ticket.controller';
import { UserModule } from 'src/user/user.module';
import { TicketEntity } from './entities/ticket.entity';
import { TicketSubscriber } from './subscribers/ticket.subscriber';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity]), UserModule, ClientModule],
  controllers: [TicketController],
  providers: [TicketService, TicketSubscriber],
})
export class TicketModule {}
