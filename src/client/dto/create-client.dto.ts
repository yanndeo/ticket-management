import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  link_util: string;

  @ApiProperty()
  @IsArray()
  emails: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  phones: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  logo: string;
}
