import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { StatusArticleEnum } from '../entities/article.entity';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({
    enum: [1, 0, -1],
    default: StatusArticleEnum.DRAFT,
  })
  @IsOptional()
  @IsEnum(StatusArticleEnum)
  @Type(() => Number)
  status: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  client: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  categories: number[];
}
