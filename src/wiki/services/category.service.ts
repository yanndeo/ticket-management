import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * create an category
   * with unique title
   * @param data
   */
  async create(data: CreateCatDto) {
    console.log(data);

    const title = await this.categoryRepository.findOne({
      title: data.title?.toLowerCase(),
    });
    console.log(title);
    if (title)
      throw new ConflictException(
        `a another category with this title exist already `,
      );
    const cat = this.categoryRepository.create(data);
    return await this.categoryRepository.save(cat);
  }

  /**
   * find all categories
   * return data with count
   * article by categories
   */
  async findAll() {
    const cats = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.articles', 'articles')
      .orderBy('category.title', 'ASC')
      .getMany();

    return cats.map((category) => {
      return {
        id: category.id,
        title: category.title,
        description: category.description,
        nb_articles: category.CountArticle,
      };
    });
  }

  /**
   * everybody
   * @param id
   */
  async findOne(id: number) {
    return await this.categoryRepository.findOne(id);
  }

  async update(id: number, data: UpdateCatDto) {
    const cat = await this.categoryRepository.findOne(id);
    if (!cat) throw new NotFoundException(`this category doesn't exist`);
    const category = await this.categoryRepository.preload({ id, ...data });
    return await this.categoryRepository.save(category);
  }

  /**
   * soft delete category
   * admin
   * @param id
   */
  async sofDelete(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException(`this category doesn't exist`);
    else return await this.categoryRepository.softDelete(id);
  }

  /**
   * restore client deleted
   * admin
   * @param id
   */
  async restore(id: number) {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select('category.id')
      .getOne();

    if (!category) throw new NotFoundException();
    return await this.categoryRepository.restore(id);
  }

  /**
   * remove definitively
   * cat and all articles
   * root
   * @param id
   */
  async remove(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException(`this category doesn't exist`);
    return this.categoryRepository.remove(category);
  }
}
