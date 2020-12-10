import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'role_admin',
  MANAGER = 'role_manager',
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
}
