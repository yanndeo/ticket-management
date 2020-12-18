import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/config/decorators/roles.decorator';
import { User } from 'src/config/decorators/user.decorator';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { ClientEntity } from '../entities/client.entity';
import { PartnerService } from '../services/partner.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('client/:client_id/partner/:user_id')
  //role_admin || role_manager
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async add(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @User() user: UserEntity,
  ): Promise<ClientEntity> {
    return await this.partnerService.add(client_id, user_id, user);
  }

  @Delete('client/:client_id/partner/:user_id')
  //role_admin || role_manager
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async remove(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @User() user: UserEntity,
  ): Promise<unknown> {
    return await this.partnerService.remove(client_id, user_id, user);
  }
}
