import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/config/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { Roles } from 'src/config/decorators/roles.decorator';
import { ArticleEntity } from '../entities/article.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.ENGINEER, UserRole.GUEST)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @User() user: UserEntity,
  ): Promise<Partial<ArticleEntity>> {
    return await this.articleService.create(createArticleDto, user);
  }

  @Get()
  async findAll(){
    return await this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
