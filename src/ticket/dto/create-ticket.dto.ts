import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PriorityTicketEnum } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  order: string;

  @ApiProperty({
    enum: ['normal', 'low', 'high', 'medium'],
    default: PriorityTicketEnum.NORMAL,
  })
  @IsOptional()
  @IsEnum(PriorityTicketEnum)
  priority: PriorityTicketEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_2: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_3: string;

  //---- RELATION -----//
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  assignTo: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  customer: number;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @Type(() => Number)
  supervisors: number[];
}
