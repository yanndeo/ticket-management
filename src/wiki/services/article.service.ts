import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
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
    const articles = await this._getQueryArticleAndAssociateEntity().getMany();
    return articles;
  }

  /**
   * get one article
   * @param id
   */
  async findOne(id: number) {
    const article = await this._getQueryArticleAndAssociateEntity()
      .where('article.id = :id', { id })
      .getOne();

    if (!article) throw new NotFoundException(`this article doesn't exist`);

    return article;
  }

  /**
   * update data
   * admin - manager or author
   * @param id
   * @param data
   */
  async update(id: number, data: UpdateArticleDto, user: UserEntity) {
    const { client: clientID, content, status, title, categories } = data;

    const article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(`this article doesn't exist`);

    if (
      user.hasRole(UserRole.ADMIN, UserRole.MANAGER) ||
      user.id === article?.author.id
    ) {
      const clientFounded = await this.customerService._findById(clientID);
      if (!clientFounded)
        throw new NotFoundException(`client associate doesn't exist`);

      const cats = [];
      if (categories && categories.length > 0) {
        for (let i = 0; i < categories.length; i++) {
          const category = await this.categoryService.findOne(categories[i]);
          cats.push(category);
        }
      }
      const newArticleObject = {
        author: user,
        client: clientID ? clientFounded : article.client,
        categories: cats.length > 0 ? cats : article.categories,
        content: content ? content : article.content,
        status: status ? status : article.status,
        title: title ? title : article.title,
      };

      const newArticle = await this.articleRepository.preload({
        id,
        ...newArticleObject,
      });

      return await this.articleRepository.save(newArticle);
    }
    throw new UnauthorizedException(
      `you're not authorized to modify this document`,
    );
  }

  /**
   * soft delete article
   * author
   * @param id
   */
  async sofDelete(id: number, user: UserEntity) {
    const article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(`this article doesn't exist`);
    if (
      user.hasRole(UserRole.ADMIN, UserRole.MANAGER) ||
      user.id === article.author.id
    ) {
      return await this.articleRepository.softDelete(id);
    }
  }

  /**
   * restore article deleted
   * admin
   * @param id
   */
  async restore(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .select('article.id')
      .getOne();

    if (!article) throw new NotFoundException();
    return await this.articleRepository.restore(id);
  }

  /**
   * remove definitively
   * article
   * root
   * @param id
   */
  async remove(id: number) {
    const article = await this.articleRepository.findOne(id);
    if (!article) throw new NotFoundException(`this category doesn't exist`);
    return await this.articleRepository.remove(article);
  }

  _getQueryArticleAndAssociateEntity() {
    return this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.client', 'client')
      .leftJoin('article.author', 'user')
      .leftJoin('article.categories', 'categories')
      .addSelect(['client.id', 'client.logo', 'client.company'])
      .addSelect(['user.id', 'user.username'])
      .addSelect(['categories.id', 'categories.title']);
  }
}
