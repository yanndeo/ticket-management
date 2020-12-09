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
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  //role_admin
  async create(
    @Body() CreateClientDto: CreateClientDto,
    @User() user: UserEntity,
  ): Promise<ClientEntity> {
    return await this.clientService.create(CreateClientDto, user);
  }

  @Get()
  //role_admin &&   //role_manager
  async findAll(): Promise<ClientEntity[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
    @User() user: UserEntity,
  ) {
    return await this.clientService.update(id, updateClientDto, user);
  }

  @Delete(':id')
  //role_admin &&   //role_manager
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.clientService.sofDelete(id, user);
  }

  @Get('restore/:id')
  //role_admin &&   //role_manager
  async recover(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<any> {
    return await this.clientService.restore(id, user);
  }
}
