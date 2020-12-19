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
   * admin and author
   * @param data
   * @param id
   * @param user
   * @param host
   */
  async create(
    data: CreateProfileDto,
    id: number,
    userConnected: UserEntity,
    host: string,
  ) {
    const userFounded = await this.userService.findOne(id);
    if (!userFounded) throw new NotFoundException();

    if (userConnected.id === id || userConnected.hasRole(UserRole.ADMIN)) {
      if (data.photo && data.photo !== undefined) {
        userFounded.Photo
          ? this.uploadableService._unlinkedFile(logoDir, userFounded.Photo)
          : '';
        const newFilename = this.uploadableService._uploadableFile(
          logoDir,
          data.photo,
        );
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
   * without user.roles
   */
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAllWithProfile();
  }

  /**
   * find user
   * with profile
   * without user.roles
   * @param id
   */
  async findOne(id: number) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException();

    delete user.created_at;
    delete user.updated_at;
    delete user.delete_at;

    return user;
  }

  /**
   * update profile 's user
   * admin and author
   * @param data
   * @param id
   * @param user
   * @param host
   */
  async update(
    data: UpdateProfileDto,
    id: number,
    user: UserEntity,
    host: string,
  ) {
    console.log(user);
    const profileFounded = await this.profileRepository.findOne(id);
    if (!profileFounded)
      throw new NotFoundException(`profile ${id} doesn't exist`);
    //const userConnected = await this.userService.findOne(user.id);

    if (user?.profile?.id === id || user.hasRole(UserRole.ADMIN)) {
      if (data.photo && data.photo !== undefined) {
        profileFounded.photo
          ? this.uploadableService._unlinkedFile(logoDir, profileFounded.photo)
          : '';
        const newFilename = this.uploadableService._uploadableFile(
          logoDir,
          data.photo,
        );
        data.photo = newFilename;
      }

      const profileUpdated = await this.profileRepository.preload({ id, ...data });
      const profile = await this.profileRepository.save(profileUpdated);
      profile.photo = data.photo ? `${host}/profiles/${profile?.photo}` : null;

      return profile;
    }
    throw new UnauthorizedException(
      `you're not authorized to modify this user's profile`,
    );
  }

  /**
   * delete user to remove profile
   * or just update profile
   */
  /* async remove(id: number, user: UserEntity): Promise<unknown> {
    return await this.profileRepository.delete(id);
  } */
}
