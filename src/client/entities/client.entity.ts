import { Column, Entity, OneToMany } from 'typeorm';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { ContactEntity } from './contact.entity';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';

@Entity('client')
export class ClientEntity extends TimestampEntity {
  @Column({ length: 255, unique: true, nullable: false })
  company: string;

  @Column({ nullable: true })
  site: string;

  @Column({ nullable: true })
  link_util: string;

  @Column('simple-array', { nullable: true })
  emails: string[];

  @Column('simple-array', { nullable: true })
  phones: string[];

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @OneToMany(() => ContactEntity, (contact) => contact.client, {
    eager: true,
    nullable: true,
    cascade: ['update', 'remove'],
    //lazy: true,
  })
  contacts: ContactEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.customer, {
    //eager: true,
    nullable: true,
  })
  tickets: TicketEntity[];
}
