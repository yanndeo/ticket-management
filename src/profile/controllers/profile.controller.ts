import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, Patch } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ProfileEntity } from '../entities/profile.entity';
import { Roles } from 'src/decorators/roles.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateProfileDto, @User() user: UserEntity) {
    return await this.profileService.create(data, user);
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
