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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  //role_admin
  @Roles(UserRole.ADMIN)
  async create(
    @Body() CreateClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientService.create(CreateClientDto);
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
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  //role_admin
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.clientService.sofDelete(id);
  }

  @Get('restore/:id')
  //role_admin
  @Roles(UserRole.ADMIN)
  async recover(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.clientService.restore(id);
  }
}
