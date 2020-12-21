import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientEntity } from '../entities/client.entity';
import { UploadableService } from 'src/helpers/uploadable/uploadable.service';

export const limitSize = 2 * 1025 * 1025;
export const logoDir = './uploads/logos/';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    private uploadableService: UploadableService,
  ) {}

  /**
   * create user
   * role_admin and role_manager
   * @param data
   */
  async create(data: CreateClientDto, host: string) {
    // eslint-disable-next-line prefer-const
    let { logo, company } = data;

    // eslint-disable-next-line prettier/prettier
    const isExist = await this.clientRepository.findOne({
      company: company.toLowerCase(),
    });
    if (isExist)
      throw new ConflictException(`customer '${company}' exist already`);

    let filename = '';
    if (logo && logo !== undefined) {
      filename = this.uploadableService._uploadableFile(logoDir, logo);
    }

    data.logo = filename;
    const client = this.clientRepository.create(data);
    const res = await this.clientRepository.save(client);

    res.logo = `${host}/logos/${filename}`;
    return res;
  }

  /**
   * all users assigned to this customer and admin or manager
   * get all clients
   */
  async findAll() {
    //userAssigned = find user.id where client = id and clients.users = user.id
    //if(userAssigned || hasRole(admin or manager))
    const clients = await this.clientRepository
      .createQueryBuilder('client')
      .orderBy('company', 'ASC')
      .getMany();

    const customers = [];

    clients.forEach((item: ClientEntity) => {
      const {
        created_at,
        updated_at,
        delete_at,
        contacts,
        tickets,
        ...result
      } = item;
      customers.push(result);
    });
    return await customers;
  }

  /**
   * find client by id
   * all users assigned to this customer and admin or manager
   * @param id
   * @param user
   */
  async findOne(id: number, user: UserEntity): Promise<ClientEntity> {
    //userAssigned = find user.id where client = id and clients.users = user.id
    //if(userAssigned || user.roles.hasRole(amin or manager))
    const client = await this.clientRepository.findOne(id);
    if (!client) throw new NotFoundException(`customer ${id} not found`);
    return client;
  }

  /**
   * update client
   * admin or manager
   * @param id
   * @param updateClientDto
   */
  async update(id: number, data: UpdateClientDto, host: string) {
    // eslint-disable-next-line prettier/prettier
    console.log(data);
    const isExist = await this.clientRepository.findOne({
      company: data.company?.toLowerCase(),
    });

    if (isExist)
      throw new ConflictException(`customer '${data.company}' exist already`);

    const client = await this.clientRepository.findOne(id);

    if (!client)
      throw new NotFoundException(`can't updated an item that doesn't exist`);

    if (data.logo && data.logo !== undefined) {
      client.logo
        ? this.uploadableService._unlinkedFile(logoDir, client.logo)
        : '';
      const newFilename = this.uploadableService._uploadableFile(
        logoDir,
        data.logo,
      );
      data.logo = newFilename;
    }
    const clientUpdated = await this.clientRepository.preload({ id, ...data });

    const res = await this.clientRepository.save(clientUpdated);

    res.logo = `${host}/logos/${res.logo}`;
    return res;
  }

  /**
   * soft delete client
   * admin
   * @param id
   */
  async sofDelete(id: number) {
    const client = await this.clientRepository.findOne(id);
    if (!client) throw new NotFoundException();
    else return await this.clientRepository.softDelete(id);
  }

  /**
   * restore client deleted
   * admin
   * @param id
   */
  async restore(id: number) {
    const client = this.clientRepository
      .createQueryBuilder('client')
      .where('client.id = :id', { id })
      .select('client.id')
      .getOne();

    if (!client) throw new NotFoundException();
    return await this.clientRepository.restore(id);
  }

  /**
   * find client without using @user
   * @param id
   */
  async _findById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne(id);
    if (!client) throw new NotFoundException(`customer ${id} not found`);
    return client;
  }
}
