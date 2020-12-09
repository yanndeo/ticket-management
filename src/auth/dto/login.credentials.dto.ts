import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class LoginCredentialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
