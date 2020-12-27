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
import { MailService } from '../mail/services/mail.service';
import { v4 as uuid } from 'uuid';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    @InjectRedis()
    private readonly redis: Redis,
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

  /**
   * REGISTER USER
   * store code into redis
   * send email confirmation
   * @param userData
   */
  async register(userData: RegisterAuthDto): Promise<Partial<UserEntity>> {
    // create new user entity
    const user = await this.userService.createEntity(userData);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    // save user entity in database
    try {
      const newUser = await this.userService.save(user);
      const { password, salt, updated_at, delete_at, ...res } = newUser;

      //add key: id value code in redis
      const code = await this._runUuidCodeAndSetRedis(res.id);
      await this.mailService.sendConfirmationEmail(res, code);

      return res;
    } catch (error) {
      throw new ConflictException(error.message);
    }
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
    //check if user account is validate account
    if (user && user.validated_at === null) {
      throw new BadRequestException(`invalid account`);
    }
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

  /**
   * user must validate his account
   * get id in redis using code-key
   * and update use's data: validated_at
   * @param key
   */
  async validateAccount(key: string) {
    const userId = await this.redis.get(`user-code-${key}`);

    if (!userId)
      //send admin email
      throw new NotFoundException(
        `this link has expired.Please contact administrator`,
      );

    const user = await this.userService.findOne(parseInt(userId));
    console.log(user);
    user.validated_at = new Date();
    return await this.userService.update(user);
  }

  /**
   * generate uuid code
   * and store it into redis
   * @param id
   */
  async _runUuidCodeAndSetRedis(id: number): Promise<string> {
    const key = uuid();
    await this.redis.set(`user-code-${key}`, id, 'EX', 160); //3days 259200 s
    const redisData = await this.redis.get(`user-code-${key}`);

    return key;

    // console.log(redisData);
    // await redis.set(id, userId.toString(), 'EX', 60 * 60 * 15);
  }
}
