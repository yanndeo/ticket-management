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
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Req() req: Request,
  ) {
    return await this.profileService.create(createProfileDto, id, user, req.get('host'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAll(): Promise<UserEntity[]> {
    return await this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  //role_admin  && author
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @User() user: UserEntity,
  ): Promise<ProfileEntity> {
    return await this.profileService.update(id, updateProfileDto, user);
  }

  /* @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return this.profileService.remove(id, user);
  } */
}
