import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { TimestampEntity } from 'src/config/generics/timestamp.entity';
import { ContactEntity } from './contact.entity';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ArticleEntity } from 'src/wiki/entities/article.entity';

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

  //----------------RELATION-----------------------//

  @OneToMany(() => ContactEntity, (contact) => contact.client, {
    eager: true,
    nullable: true,
    cascade: ['update', 'remove'],
    //lazy: true,
  })
  contacts: ContactEntity[];

  @ManyToMany(() => UserEntity, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  partners: UserEntity[]; //engineer, manager, admin, guest

  @OneToMany(() => TicketEntity, (ticket) => ticket.customer, {
    //eager: true,
    nullable: true,
  })
  tickets: TicketEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.client, {
    eager: false,
    nullable: true,
    cascade: false,
  })
  articles: ArticleEntity[];

  //----------------LISTENERS-----------------------//
  @BeforeInsert()
  emailsToLowerCase() {
    if (this.emails?.length > 0) {
      const emails = this.emails?.map((email) => email.toLowerCase());
      this.emails = emails;
      return this.emails;
    }
  }
}
