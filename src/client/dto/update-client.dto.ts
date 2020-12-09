import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ContactEntity } from '../entities/contact.entity';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  site: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  link_util: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
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
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsOptional()
  contacts: ContactEntity[];
}
