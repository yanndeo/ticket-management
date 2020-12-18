import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { User } from 'src/config/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientEntity } from '../entities/client.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  //role_admin
  @Roles(UserRole.ADMIN)
  async create(
    @Body() createClientDto: CreateClientDto,
    @Req() req: Request,
  ): Promise<any> {
    //createClientDto.logo = logo;
    //1- check if logo exist and not undefined
    //2- receive base64 image const base64
    //3- convert base64 to image
    //4- get and check extension
    //5- check size
    //6- if ext and size is good ; generate uuid like filename
    //7- move file image into the folder /uploads/logo
    //8- save all data with filename
    //9- return uri images
    return await this.clientService.create(createClientDto, req.get('host'));
  }

  @Get()
  //role_admin || role_manager
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll(): Promise<ClientEntity[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  //role_admin || role_manager || user associated to client
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.clientService.findOne(id, user);
  }

  @Patch(':id')
  //role_admin || role_manager
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: Request,
  ) {
    //1- check if logo exist and not undefined
    //2- get key (uuid) of item from database : filename = client.logo //Ex: 223-SDD-...png
    //3- search image filename corresponding and remove this from folder
    //4- init process to convert base64 to image ...
    return await this.clientService.update(
      id,
      updateClientDto,
      req.get('host'),
    );
  }

  @Delete(':id')
  //role_admin
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.clientService.sofDelete(id);
  }

  @Get(':id/restore')
  //role_admin
  @Roles(UserRole.ADMIN)
  async recover(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.clientService.restore(id);
  }
}
