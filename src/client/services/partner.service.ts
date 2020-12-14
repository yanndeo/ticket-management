import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { removeItem } from 'src/helpers';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    private userService: UserService,
  ) {}

  /**
   * add user into list of partners
   * admin - manager
   * @param clientId
   * @param userId
   * @param user
   */
  async add(clientId: number, userId: number, user: UserEntity) {
    const client = await this.clientRepository.findOne(clientId);

    if (!client)
      throw new NotFoundException(`client '${clientId}' doesn't exist`);

    const partner = await this.userService.findOne(userId);
    if (!partner)
      throw new NotFoundException(`this user '${userId}' doesn't exist`);

    client.partners?.push(partner);

    //notification: user.username added new partner : partner.username
    //mail : you have added in client.company group

    return await this.clientRepository.save(client);
  }

  /**
   * remove users from list of partners
   * admin - manager
   * @param clientId
   * @param userId
   * @param user
   */
  async remove(clientId: number, userId: number, user: UserEntity) {
    const client = await this.clientRepository.findOne(clientId);
    if (!client)
      throw new NotFoundException(`client '${clientId}' doesn't exist`);

    const partner = await this.userService.findOne(userId);
    if (!partner)
      throw new NotFoundException(`this user '${userId}' doesn't exist`);

    const { partners } = client;
    const index = partners.findIndex((item) => item.id === userId);
    index !== -1 ? partners.splice(index, 1) : false;

    console.log(partners);

    return await this.clientRepository.save(client);
  }
}
