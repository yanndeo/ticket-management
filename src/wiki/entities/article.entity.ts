import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { TimestampEntity } from 'src/config/generics/timestamp.entity';
import { CategoryEntity } from './category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Expose } from 'class-transformer';
import { ClientEntity } from 'src/client/entities/client.entity';

export enum StatusArticleEnum {
  PUBLISHED = 1,
  DRAFT = 0,
  TRASH = -1,
}

@Entity('article')
export class ArticleEntity extends TimestampEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ length: 50, nullable: false, default: StatusArticleEnum.DRAFT })
  status: string;

  //----------------RELATION-----------------------//

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @ManyToOne(() => ClientEntity, (client) => client.articles)
  client: ClientEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.articles)
  @JoinTable()
  categories: CategoryEntity[];

  // ----------------- custom attributes/properties

  @Expose({ name: '_author' })
  get Author() {
    return this.author?.username;
  }

  @Expose({ name: '_client' })
  get Client() {
    return this.client?.company;
  }

  @Expose({ name: '_categories' })
  get Categories(): string[] {
    return this.categories?.map((category) => category.title);
  }
}
