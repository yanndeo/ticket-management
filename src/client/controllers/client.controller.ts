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
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientEntity } from '../entities/client.entity';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerConfig } from '../../config/multer.config';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Request } from 'express';

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  //role_admin
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter,
      limits: { fileSize: 2 * 1024 * 1025 },
    }),
  )
  async create(
    @Body() createClientDto: CreateClientDto,
    @UploadedFile() logo,
    @Req() req: Request,
  ): Promise<ClientEntity> {
    console.log(req.file);

    createClientDto.logo = logo;
    return await this.clientService.create(createClientDto, req.get('host'));
  }

  @Get()
  //role_admin || role_manager
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll(): Promise<ClientEntity[]> {
    console.log(
      Buffer.from('SGVsbG8gV29ybGQhhhhh=', 'base64').toString('ascii'),
    );
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
  @UseInterceptors(FileInterceptor('logo'))
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

  @Get(':id/restore')
  //role_admin
  @Roles(UserRole.ADMIN)
  async recover(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.clientService.restore(id);
  }
}
