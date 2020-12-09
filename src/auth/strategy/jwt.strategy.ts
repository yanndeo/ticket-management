import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interface/payload.interface';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('APP_SECRET'),
    });
  }

  async validate(payload: PayloadInterface): Promise<Partial<UserEntity>> {
    console.log('payload:', payload);
    const user = await this.authService.validateUser(payload.username);
    //if user exist return it . It's automatically placed in request
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
