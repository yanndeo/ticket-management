import { TimestampEntity } from 'src/generics/timestamp.entity';
import { AfterInsert, Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('curriculum')
export class CurriculumEntity extends TimestampEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  firstname: string;

  @Column()
  age: number;

  @Column({ unique: true })
  cin: string;

  @Column()
  job: string;

  @Column({ nullable: true })
  path: string;

  @Column({ default: true })
  isActive: boolean;

  counters: number;

  @AfterInsert()
  resetCounters() {
    this.counters = 0;
    console.log(this.counters);
  }

  //RELATION
  @ManyToOne(() => UserEntity, (user) => user.curriculums, {
    cascade: ['insert', 'update'],
    eager: true,
    nullable: true,
  })
  user: UserEntity;
}
