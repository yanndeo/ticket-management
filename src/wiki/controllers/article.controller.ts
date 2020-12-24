import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  Req,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';


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
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return await this.articleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @User() user: UserEntity,
  ) {
    return this.articleService.update(id, updateArticleDto, user);
  }

  @Delete(':id')
  softDelete(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<unknown> {
    return this.articleService.sofDelete(id, user);
  }

  @Get(':id/restore')
  @Roles(UserRole.ADMIN)
  async restore(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.articleService.restore(id);
  }

  @Get(':id/remove')
  @Roles(UserRole.ROOT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.articleService.remove(id);
  }

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @UploadedFile() file,
    @Req() req: Request,
  ) {
    return this.articleService.uploadFile(id, file, user, req.get('host') );
  }
}
