import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private userService: UserService,
  ) {}

  /**
   * create profile's user
   * @param data
   * @param id
   * @param user
   */
  async create(data: CreateProfileDto, id: number, userConnected: UserEntity) {
    const userFounded = await this.userService.findOne(id);
    if (!userFounded) throw new NotFoundException();

    if (userConnected.id === id || userConnected.hasRole(UserRole.ADMIN)) {
      const profile = this.profileRepository.create(data);
      userFounded.profile = profile;

      return await this.userService.update(userFounded);
    }
    throw new UnauthorizedException(
      `you're not authorized to modify this profile`,
    );
  }

  /**
   * find all users
   * with profile
   */
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAllWithProfile();
  }

  /**
   * find user
   * with profile
   * @param id
   */
  async findOne(id: number): Promise<UserEntity> {
    const profile = await this.userService.findOne(id);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  /**
   * update profile 's user
   * @param id
   * @param data
   * @param user
   */
  async update(
    id: number,
    data: UpdateProfileDto,
    user: UserEntity,
  ): Promise<ProfileEntity> {
    const newProfile = await this.profileRepository.preload({ id, ...data });
    if (!newProfile) {
      throw new NotFoundException(`profile ${id} doesn't exist`);
    }
    const userWithProfile = await this.userService.findOne(user.id);

    /*  if (
      user.roles === UserRole.ADMIN ||
      (userWithProfile.profile && userWithProfile.profile.id === id)
    ) { */
    return await this.profileRepository.save(newProfile);
    /* } else {
      throw new UnauthorizedException();
    } */
  }

  /* async remove(id: number, user: UserEntity): Promise<unknown> {
    return await this.profileRepository.delete(id);
  } */
}
