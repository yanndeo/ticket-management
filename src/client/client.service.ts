import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { Repository, QueryBuilder } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  /**
   * create user
   * role_admin and role_manager
   * @param data
   * @param user
   */
  async create(data: CreateClientDto, user: UserEntity) {
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      const client = this.clientRepository.create(data);
      return await this.clientRepository.save(client);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * get all clients
   */
  async findAll() {
    return await this.clientRepository.find({ order: { id: 'DESC' } });
  }

  /**
   * find client by id
   * @param id
   */
  async findOne(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException(`customer ${id} not found`);
    }
    return client;
  }

  /**
   * update client
   * @param id
   * @param updateClientDto
   */
  async update(id: number, data: UpdateClientDto, user: UserEntity) {
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      const client = await this.clientRepository.preload({ id, ...data });
      if (!client) throw new NotFoundException();
      return await this.clientRepository.save(client);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * soft delete client
   * role_admin or role_manager
   * can do it
   * @param id
   * @param user
   */
  async sofDelete(id: number, user: UserEntity): Promise<any> {
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      const client = await this.clientRepository.findOne(id);
      if (!client) throw new NotFoundException();
      else return await this.clientRepository.softDelete(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * restore client deleted
   * role_admin or role_manager
   * @param id
   * @param user
   */
  async restore(id: number, user: UserEntity): Promise<unknown> {
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      const client = this.clientRepository
        .createQueryBuilder('client')
        .where('client.id = : id', { id: id });

      if (!client) {
        throw new NotFoundException();
      }
      return await this.clientRepository.restore(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
