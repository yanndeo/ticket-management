import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/config/decorators/user.decorator';
import { ContactService } from '../services/contact.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ContactEntity } from '../entities/contact.entity';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Roles } from 'src/config/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('contacts')
  async findAll(): Promise<ContactEntity[]> {
    return await this.contactService.findAll();
  }

  @Get('contact/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactEntity> {
    return await this.contactService.findOne(id);
  }

  @Get('client/:client_id/contact')
  async getAllByClient(
    @Param('client_id', ParseIntPipe) client_id: number,
    @User() user: UserEntity,
  ): Promise<ContactEntity[]> {
    return await this.contactService.getAll(client_id, user);
  }

  @Post('client/:client_id/contact')
  @UseInterceptors(FileInterceptor('file'))
  //admin-manager-engineer
  @Roles(UserRole.ADMIN)
  async create(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Body() createContactDto: CreateContactDto,
    @User() user: UserEntity,
  ): Promise<ContactEntity> {
    return await this.contactService.create(client_id, createContactDto, user);
  }

  @Get('client/:client_id/contact/:contact_id')
  async getOneByClient(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Param('contact_id', ParseIntPipe) contact_id: number,
  ): Promise<ContactEntity> {
    return this.contactService.getOne(client_id, contact_id);
  }

  @Patch('client/:client_id/contact/:contact_id')
  //admin-manager-engineer
  @Roles(UserRole.ADMIN)
  async update(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Param('contact_id', ParseIntPipe) contact_id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<ContactEntity> {
    return await this.contactService.update(
      client_id,
      contact_id,
      updateContactDto,
    );
  }

  @Delete('client/:client_id/contact/:contact_id')
  //admin-manager-engineer
  @Roles(UserRole.ADMIN)
  async remove(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Param('contact_id', ParseIntPipe) contact_id: number,
  ): Promise<any> {
    return await this.contactService.remove(client_id, contact_id);
  }
}
