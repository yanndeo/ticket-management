import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ArticleEntity } from './entities/article.entity';
import { CategoryEntity } from './entities/category.entity';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, CategoryEntity]),
    ClientModule,
  ],
  controllers: [ArticleController, CategoryController],
  providers: [ArticleService, CategoryService],
})
export class WikiModule {}
