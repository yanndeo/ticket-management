import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCvDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cin: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  job: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  path: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
