/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from '../auth/dto/login.credentials.dto';
import { PayloadInterface } from './interface/payload.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  /** */
  async _sign(payload: PayloadInterface): Promise<any> {
    const jwt = await this.jwtService.sign(payload);
    return { access_token: jwt };
  }

  /** user it in jwt strategy */
  async validateUser(username: string): Promise<Partial<UserEntity>> {
    const user = await this.userService.findByUsername(username);
    //if user exist return it . It's automatically placed in request
    if (user) {
      /*delete user.password;
      delete user.salt*/
      const { password, salt, ...result } = user; //tous le reste des properties est mis dans result.
      return result;
    }
  }

  //REGISTER USER
  async register(userData: RegisterAuthDto): Promise<Partial<UserEntity>> {
    // create new user entity
    const user = await this.userService.createEntity(userData);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    // save user entity in database
    try {
      await this.userService.save(user);
    } catch (error) {
      throw new ConflictException(error.message);
    }
    // customize response to hide salt and password
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
  }

  //LOGIN USER
  async login(credentials: LoginCredentialsDto): Promise<unknown> {
    const { username, password } = credentials;

    const user = await this.userService.findByUsername(username);
    //console.log(user);
    //check if user exist in database
    if (!user) {
      throw new BadRequestException('username or password is incorrect');
    }
    /* if (user && user.validated_at === null) {
      throw new BadRequestException(`invalid account`);
    } */
    //if user exist , crypt his password
    const hashedPassword = await bcrypt.hash(password, user.salt);
    //check if password has been hashed.
    if (!hashedPassword) {
      throw new InternalServerErrorException();
    }
    //check is password is matched
    if (hashedPassword !== user.password) {
      throw new BadRequestException('username or password is incorrect');
    } else {
      const { id, username, roles, email, validated_at } = user; //destructuring
      const payload = { id, username, email, roles, validated_at }; //Assignation

      console.log(payload);
      return await this._sign(payload);

      /*  const jwt = await this.jwtService.sign(payload);
      return { access_token: jwt }; */
    }
  }
}
