import { TicketEntity } from '../entities/ticket.entity';

/**
 * private meth
 * customize data ticket object
 * returned
 * @param ticket
 */
export const _partialDataTicket = (ticket: TicketEntity) => {
  return {
    id: ticket.id,
    matricule: ticket.matricule,
    order: ticket.order,
    subject: ticket.subject,
    priority: ticket.priority,
    status: ticket.status,
    description: ticket.description,
    comment: ticket.comment,
    image_1: ticket.image_1,
    image_2: ticket.image_2,
    image_3: ticket.image_3,
    assignTo: {
      id: ticket.assignTo.id,
      username: ticket.assignTo.username,
      email: ticket.assignTo.email,
      _fullName: ticket.assignTo?.Fullname,
      _photo: ticket.assignTo?.Photo,
      _tel: ticket.assignTo.profile?.mobile ?? ticket.assignTo?.profile?.fixe,
    },
    customer: {
      id: ticket.customer.id,
      company: ticket.customer.company,
      logo: ticket.customer.logo,
    },
    supervisors: ticket.supervisors?.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        _fullName: item.Fullname,
        _photo: item.Photo,
        //_tel: item.profile?.mobile ?? item.profile?.fixe,
      };
      /* const {
          validated_at,
          salt,
          password,
          delete_at,
          created_at,
          updated_at,
          roles,
          ...res
        } = item;
        return res; */
    }),
    createdBy: ticket.createdBy,
  };
};

/**
 * sql query on ticket table
 */
export const _getQueryTicketAndAssociateEntity = (repo) => {
  return repo
    .createQueryBuilder('ticket')
    .leftJoin('ticket.customer', 'client')
    .leftJoin('ticket.assignTo', 'engineer')
    .leftJoin('ticket.supervisors', 'supervisor')
    .select([
      'ticket.id',
      'ticket.matricule',
      'ticket.order',
      'ticket.priority',
      'ticket.status',
      'ticket.createdBy',
      'ticket.subject',
      'ticket.description',
      'ticket.comment',
      'ticket.created_at',
      'ticket.image_1',
      'ticket.image_2',
      'ticket.image_3',
    ])
    .addSelect(['client.id', 'client.company', 'client.logo'])
    .addSelect(['engineer.id', 'engineer.username'])
    .addSelect(['supervisor.id', 'supervisor.username']);
  // .getQuery();
};
