import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column({ length: 40, nullable: true })
  type: string;

  @Column({ nullable: true })
  filename: string;

  //---------------------RELATION-----------------------//
  @ManyToOne(() => ArticleEntity, (article) => article.files)
  article: ArticleEntity;
}
