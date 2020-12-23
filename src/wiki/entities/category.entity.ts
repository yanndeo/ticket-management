import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @DeleteDateColumn()
  delete_at: Date;

  //---------------------RELATION-----------------------//

  @ManyToMany(() => ArticleEntity, (article) => article.categories)
  articles: ArticleEntity[];

  @Expose({ name: '_countArticle' })
  get CountArticle() {
    return this.articles?.length;
  }

  // -------------------- Events -------------------------//

  @BeforeInsert()
  titleToLowerCase() {
    if (this.title) {
      return this.title.toLowerCase().trim();
    }
  }
}
