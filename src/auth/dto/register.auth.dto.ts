import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class RegisterAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  password: string;

  @ApiProperty({
    default: UserRole.GUEST,
  })
  @IsOptional()
  @IsArray()
  //@IsEnum(UserRole)
  roles: UserRole[];
}
