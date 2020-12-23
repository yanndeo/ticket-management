import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CategoryService } from '../services/category.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categorie')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createCatDto: CreateCatDto): Promise<CategoryEntity> {
    return await this.categoryService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  softDelete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.categoryService.sofDelete(+id);
  }

  @Get(':id/restore')
  @Roles(UserRole.ADMIN)
  async restore(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.categoryService.restore(id);
  }

  @Get(':id/remove')
  @Roles(UserRole.ROOT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.categoryService.remove(id);
  }
}
