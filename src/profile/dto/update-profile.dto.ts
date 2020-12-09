import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mobile: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fixe: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo: string | null;
}
