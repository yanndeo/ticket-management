import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LoginCredentialsDto } from '../auth/dto/login.credentials.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(@Body() data: RegisterAuthDto): Promise<Partial<UserEntity>> {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginCredentialsDto): Promise<unknown> {
    return await this.authService.login(data);
  }

  @Get(':code/confirm')
  async confirm(@Param('code') code: string): Promise<UserEntity> {
    return await this.authService.validateAccount(code);
  }
}
