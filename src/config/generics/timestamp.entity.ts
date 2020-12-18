import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
