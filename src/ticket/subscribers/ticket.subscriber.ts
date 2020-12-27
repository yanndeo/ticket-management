import { MatriculeGeneratorService } from 'src/helpers/matricule-ticket/matricule-generator.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { TicketEntity } from '../entities/ticket.entity';

@EventSubscriber()
// eslint-disable-next-line prettier/prettier
export class TicketSubscriber
  implements EntitySubscriberInterface<TicketEntity> {
  private matriculeGenerator: MatriculeGeneratorService;

  constructor(
    connection: Connection,
    matriculeGenerator: MatriculeGeneratorService,
  ) {
    connection.subscribers.push(this);
    this.matriculeGenerator = matriculeGenerator;
  }

  listenTo() {
    return TicketEntity;
  }

  async beforeInsert(event: InsertEvent<TicketEntity>): Promise<any> {
    console.log(`BEFORE TICKET INSERTED:`, event.entity);
    //call clientService to find client corresponding :event.entity.customer
    //await this.matriculeGenerator.handle(event.entity.customer);
    //return event.entity;
  }
}
