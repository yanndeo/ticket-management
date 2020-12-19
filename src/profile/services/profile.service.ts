import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { _unlinkedFile, _uploadableFile } from 'src/utils';
import { UploadableService } from 'src/helpers/uploadable/uploadable.service';

export const limitSize = 2 * 1025 * 1025;
export const logoDir = './uploads/profiles/';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private userService: UserService,
    private uploadableService: UploadableService,
  ) {}

  /**
   * create profile's user
   * @param data
   * @param id
   * @param user
   * @param host
   */
  async create(data: CreateProfileDto, id: number, userConnected: UserEntity, host: string) {
    const userFounded = await this.userService.findOne(id);
    if (!userFounded) throw new NotFoundException();

    if (userConnected.id === id || userConnected.hasRole(UserRole.ADMIN)) {
      if (data.photo && data.photo !== undefined) {
        userFounded.Photo
          ? this.uploadableService._unlinkedFile(logoDir, userFounded.Photo)
          : '';
        const newFilename = this.uploadableService._uploadableFile(logoDir, data.photo);
        data.photo = newFilename;
      }

      const profile = this.profileRepository.create(data);
      userFounded.profile = profile;

      const user = await this.userService.update(userFounded);
      user.profile.photo = `${host}/profiles/${user.profile?.photo}`;
      return user;
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
