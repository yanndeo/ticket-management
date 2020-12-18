import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { AddCvDTO } from './dto/Add-cv-dto';
import { CurriculumEntity } from './entities/curriculum.entity';
import { UpdateCvDTO } from './dto/Update-cv-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../config/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  //admin or author
  async index(@User() user: UserEntity): Promise<CurriculumEntity[]> {
    /*  if (user.roles === UserRole.ADMIN) {
      return await this.curriculumService.findAll();
    } */
    return await this.curriculumService.getOwnerAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() data: AddCvDTO,
    @User() user: UserEntity,
  ): Promise<CurriculumEntity> {
    return await this.curriculumService.add(data, user);
  }

  //using query builder typeorm
  @Get('stats')
  async statsCVNumberByAge() {
    return await this.curriculumService.groupCvNumberByAge();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  // update with criteria
  async updateByCriteria(@Body() data: any): Promise<any> {
    const { criteria, updatecvdto } = data;
    return await this.curriculumService.updateByCriteria(criteria, updatecvdto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<CurriculumEntity> {
    return await this.curriculumService.findById(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCvDTO,
    @User() user: UserEntity,
  ): Promise<CurriculumEntity> {
    return await this.curriculumService.update(id, data, user);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<CurriculumEntity> {
    return await this.curriculumService.remove(id, user);
    //return await this.curriculumService.softRemove(id);
  }

  //we can not use :id and @Param and user [4, 5, 6] or {age: 12} ans @Body()
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<any> {
    //return await this.curriculumService.delete(id);
    return await this.curriculumService.sofDelete(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  async recover(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<any> {
    return this.curriculumService.restore(id, user);
  }
}
