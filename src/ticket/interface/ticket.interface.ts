import { ClientEntity } from 'src/client/entities/client.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export interface TicketInterface {
  id: number;
  matricule: string;
  order: string;
  assignTo: Partial<UserEntity>;
  customer: Partial<ClientEntity>;
  description: string;
  createdBy: string;
  priority: string;
  status: string;
  supervisors: Partial<any[]>; //
}
