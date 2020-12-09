import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dto/register.auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createEntity(userData: RegisterAuthDto): Promise<UserEntity> {
    return await this.userRepository.create({ ...userData });
  }

  async findByUsername(data: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username: data });
  }

  async save(data: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async update(data: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.preload(data);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(data: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(data, {
      relations: ['profile'],
    });
    //return await this.userRepository.findOne(data, { relations: ['profile'] });
    if (!user) throw new NotFoundException(`user ${data} not exist`);
    return user;
  }

  async findAllWithProfile(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
     // .leftJoinAndSelect('user.tickets', 'ticket')
      .getMany();
  }

  async isOwnerOrAdmin(object: any, user: UserEntity): Promise<boolean> {
    return (
      user.role === UserRole.ADMIN ||
      (object.user && object.user.id === user.id)
    );
  }

  async isAdminOrManager(user: UserEntity): Promise<boolean> {
    return user.role === UserRole.ADMIN || UserRole.MANAGER ? true : false;
  }
}
