import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/config/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { TicketInterface } from '../interface/ticket.interface';
import { TicketEntity } from '../entities/ticket.entity';

//@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  //exclude guest
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER, UserRole.ENGINEER)
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @User() user: UserEntity,
  ): Promise<TicketInterface> {
    const ticket = await this.ticketService.create(createTicketDto, user);
    //1-send sse notification to all users [assigned and supervisors]
    //send whatsapp message to user assigned
    return ticket;
  }

  @Get()
  //admin
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<TicketEntity[]> {
    return await this.ticketService.findAll();
  }

  @Get(':id')
  //admin - manager - customer - user_associated
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER, UserRole.ENGINEER)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TicketEntity> {
    return await this.ticketService.findOne(id);
  }

  @Patch(':id')
  //admin - manager - customer - engineer - user_assigned - supervisors
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER, UserRole.ENGINEER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
    @User() user: UserEntity,
  ): Promise<TicketInterface> {
    return await this.ticketService.update(id, updateTicketDto, user);
  }

  @Delete(':id')
  //admin - manager - customer
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER)
  async softDelete(@Param('id') id: string): Promise<unknown> {
    return await this.ticketService.softDelete(+id);
  }

  @Get(':id/restore')
  //admin
  @Roles(UserRole.ADMIN)
  async recover(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.ticketService.restore(id);
  }

  @Get(':id/remove')
  //admin
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.ticketService.remove(id);
  }

  @Get(':id/user')
  //admin - client - engineer - manager
  async getAllByUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TicketEntity[]> {
    return await this.ticketService.getAllByUser(id);
  }

  @Get(':id/customer')
  //admin - client - engineer - manager
  async getAllByClient() {
    //return await this.ticketService.getAllByClient(id);
  }
}
