import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

export enum PriorityTicketEnum {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  NORMAL = 'normal',
}

export enum StatusTicketEnum {
  NEW = 'new',
  WAITING = 'waiting',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

@Entity('ticket')
export class TicketEntity extends TimestampEntity {
  @Column({ length: 255, unique: true, nullable: false })
  matricule: string;

  //@Column({ length: 255, unique: true, nullable: true })
  //code: string;

  @Column({ length: 255, unique: false, nullable: true })
  order: string;

  @Column({ length: 60, nullable: false, default: PriorityTicketEnum.NORMAL })
  priority: string;

  @Column({ nullable: false, default: StatusTicketEnum.NEW })
  status: string;

  @Column({ type: 'text', nullable: false })
  subject: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @Column({ type: 'varchar', nullable: false })
  createdBy: string;

  //-----------------files-------------------------//

  @Column({ nullable: true })
  image_1: string;

  @Column({ nullable: true })
  image_2: string;

  @Column({ nullable: true })
  image_3: string;

  //----------------RELATION-----------------------//
  @ManyToOne(() => UserEntity, (user) => user.tickets, {
    nullable: false,
    eager: true,
  })
  assignTo: UserEntity;

  @ManyToOne(() => ClientEntity, (client) => client.tickets, {
    nullable: false,
    eager: true,
  })
  customer: ClientEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  supervisors: UserEntity[];
}
