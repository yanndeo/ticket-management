import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 180, nullable: false, default: 'NR' })
  job: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @ManyToOne(() => ClientEntity, (client) => client.contacts, {
    nullable: false,
  })
  client: ClientEntity;
}
