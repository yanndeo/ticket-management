import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Patch,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { User } from 'src/config/decorators/user.decorator';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('user/:id')
  //role_admin  && author
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Req() req: Request,
  ): Promise<UserEntity> {
    return await this.profileService.create(
      createProfileDto,
      id,
      user,
      req.get('host'),
    );
  }

  @Get('users')
  async findAll(): Promise<UserEntity[]> {
    return await this.profileService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return await this.profileService.findOne(id);
  }

  @Patch(':id')
  //role_admin && author
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Req() req: Request,
  ): Promise<ProfileEntity> {
    return await this.profileService.update(
      updateProfileDto,
      id,
      user,
      req.get('host'),
    );
  }

  /* @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return this.profileService.remove(id, user);
  } */
}
