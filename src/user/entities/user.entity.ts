import { CurriculumEntity } from 'src/curriculum/entities/curriculum.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';

export enum UserRole {
  ROOT = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  MANAGER = 'ROLE_MANAGER',
  ENGINEER = 'ROLE_ENGINEER',
  CUSTOMER = 'ROLE_CUSTOMER',
  USER = 'ROLE_USER',
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
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

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
