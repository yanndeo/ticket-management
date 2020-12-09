import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredentialsDto } from '../auth/dto/login.credentials.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterAuthDto } from './dto/register.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterAuthDto): Promise<Partial<UserEntity>> {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginCredentialsDto): Promise<unknown> {
    return await this.authService.login(data);
  }
}
