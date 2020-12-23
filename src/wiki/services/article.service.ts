import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ClientService } from 'src/client/services/client.service';
import { CategoryService } from './category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    private categoryService: CategoryService,
    private customerService: ClientService,
  ) {}

  /**
   * add article and author
   * check if client associate exist
   * @param data
   * @param user
   */
  async create(data: CreateArticleDto, user: UserEntity) {
    const { client: clientID, content, status, title, categories } = data;

    const clientFounded = await this.customerService._findById(clientID);
    if (!clientFounded)
      throw new NotFoundException(`client associate doesn't exist`);

    //add categories manyToMany table
    const cats = [];
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        const category = await this.categoryService.findOne(categories[i]);
        cats.push(category);
      }
    }

    const articleObject = {
      author: user,
      client: clientFounded,
      categories: cats,
      content,
      status,
      title,
    };

    const newArticle = this.articleRepository.create(articleObject);
    const article = await this.articleRepository.save(newArticle);

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      status: article.status,
      _categories: article.Categories,
      _author: article.Author,
      _client: article.Client,
    };
  }

  /**
   * all articles
   * everybody
   */
  async findAll() {
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.client', 'client')
      .leftJoin('article.author', 'user')
      .leftJoin('article.categories', 'categories')
      .addSelect(['client.id', 'client.logo', 'client.company'])
      .addSelect(['user.id', 'user.username'])
      .getMany();

    return articles;
  }

  findOne(id: number) {
    return `This action returns a #${id} wiki`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} wiki`;
  }

  remove(id: number) {
    return `This action removes a #${id} wiki`;
  }
}
