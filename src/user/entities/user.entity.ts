import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { TimestampEntity } from 'src/config/generics/timestamp.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IsDateString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { ArticleEntity } from 'src/wiki/entities/article.entity';

export enum UserRole {
  //interne
  ROOT = 'root',
  ADMIN = 'role_admin',
  MANAGER = 'role_manager',
  //external
  ENGINEER = 'role_engineer', //manage ticket
  CUSTOMER = 'role_customer', //manage ticket
  GUEST = 'guest',
}

@Entity('user')
export class UserEntity extends TimestampEntity {
  @Column({ length: 180, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column({
    type: 'set',
    enum: UserRole,
    nullable: false,
    default: [UserRole.GUEST],
  })
  roles: UserRole[];

  @Column({ nullable: true })
  @IsDateString()
  validated_at: Date;

  //----------RELATION-------------//
  @OneToOne(() => ProfileEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => CurriculumEntity, (curriculum) => curriculum.user, {
    nullable: true,
  })
  curriculums: CurriculumEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.assignTo, {
    lazy: true,
    nullable: true,
  })
  tickets: Promise<TicketEntity[]>;

  @OneToMany(() => ArticleEntity, (article) => article.author, {
    eager: false,
    nullable: true,
  })
  articles: ArticleEntity[];

  // ----------------- custom attributes/properties

  @Expose({ name: '_fullname' })
  get Fullname() {
    return `${this.profile?.firstname} ${this.profile?.lastname}`;
  }

  @Expose({ name: '_photo' })
  get Photo(): string {
    return `${this.profile?.photo}`;
  }
  // ----------------- Events

  @BeforeInsert()
  emailToLowerCase() {
    if (this.email) {
      return this.email.toLowerCase().trim();
    }
  }

  // ----------------- Functions
  @Exclude()
  hasRole = (...roles: any): boolean => {
    const requiredRoles = [UserRole.ROOT, ...roles];
    return this.roles.some((item: string) => requiredRoles.includes(item));
  };
}
