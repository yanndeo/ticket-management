import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactEntity } from '../entities/contact.entity';
import { ClientEntity } from '../entities/client.entity';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    private userService: UserService,
  ) {}

  /**
   * find all client of database
   * all role except role_client/contact
   */
  async findAll() {
    const contacts = this.contactRepository
      .createQueryBuilder('contact')
      .innerJoin('contact.client', 'client')
      .addSelect(['client.id', 'client.company'])
      .orderBy('contact.fullname', 'ASC')
      .getMany();
    return contacts;
  }

  /**
   * add contact to client
   * @param id
   * @param data
   * @param user
   */
  async create(id: number, data: CreateContactDto, user: UserEntity) {
    console.log('data:', data);
    //if (user.roles === UserRole.MANAGER || UserRole.ADMIN) {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException(`client ${id} not found`);
    }
    const contact = this.contactRepository.create(data);
    contact.client = client;
    return await this.contactRepository.save(contact);
    /*}else {
      throw new UnauthorizedException();
    } */
  }

  /**
   * Qui a e droit de voir l' ensemble des contacts ?
   * get all contacts
   * of client id
   * @param id
   * @param user
   */
  async getAll(id: number, user: UserEntity) {
    const client = await this.clientRepository.findOne(id);

    if (!client) {
      throw new NotFoundException(`client ${id} not found`);
    }

    const contacts = await this.contactRepository.find({
      where: { client: client },
      order: { id: 'DESC' },
    });

    return contacts;
  }

  /**
   * get contact by id
   * join client property company
   * @param id
   */
  async findOne(id: number) {
    const contact = await this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin('contact.client', 'client')
      .select(
        'contact.id, fullname, job, phone, email, comment, company, clientId',
      )
      .where('contact.id = :id', { id: id })
      .getRawOne();

    if (!contact) throw new NotFoundException();

    return contact;
  }

  /**
   * Get contact by id and client id
   * join client property company
   * @param client_id
   * @param contact_id
   */
  async getOne(client_id: number, contact_id: number) {
    const contact = await this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin('contact.client', 'client')
      .select(
        'contact.id, fullname, job, phone, email, comment, company, clientId',
      )
      .where('contact.id = :contact_id', { contact_id: contact_id })
      .andWhere('contact.clientId = :client_id', { client_id: client_id })
      //.getSql()
      .getRawOne();

    if (!contact) throw new NotFoundException();

    return contact;
  }

  /**
   * update contact if we have client id corresponding
   * who can update contact : all
   * @param client_id
   * @param id //contact_id
   * @param data
   */
  async update(client_id: number, id: number, data: UpdateContactDto) {
    const clientExist = await this.clientRepository.findOne(client_id);
    if (!clientExist) throw new NotFoundException('this client not exist');
    const contact = await this.contactRepository.preload({ id, ...data });
    if (!contact) throw new NotFoundException();
    return await this.contactRepository.save(contact);
  }

  /**
   *
   * @param client_id
   * @param contact_id
   */
  async remove(client_id: number, contact_id: number) {
    const contact = await this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin('contact.client', 'client')
      .select(
        'contact.id, fullname, job, phone, email, comment, company, clientId',
      )
      .where('contact.id = :contact_id', { contact_id: contact_id })
      .andWhere('contact.clientId = :client_id', { client_id: client_id })
      .getRawOne();

    if (!contact) throw new NotFoundException('contact not exist');

    return await this.contactRepository.remove(contact);
  }
}
