import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusTicketEnum } from '../entities/ticket.entity';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({
    enum: ['new', 'rejected', 'waiting', 'resolved'],
    default: StatusTicketEnum.NEW,
  })
  @IsOptional()
  @IsEnum(StatusTicketEnum)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  matricule: string;
}
