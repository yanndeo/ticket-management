import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class AddCvDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @ApiProperty()
  //@IsNotEmpty()
  //@IsString()
  cin: string;

  @ApiProperty()
  @IsNotEmpty()
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
