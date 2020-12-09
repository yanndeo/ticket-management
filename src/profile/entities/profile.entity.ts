import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 80 })
  lastname: string;

  @Column({ type: 'longtext', nullable: true })
  address: string;

  @Column({ nullable: false })
  nationality: string;

  @Column({ length: 80, nullable: true })
  mobile: string;

  @Column({ length: 80, nullable: true })
  fixe: string;

  @Column({ nullable: true })
  photo: string | null;

  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
