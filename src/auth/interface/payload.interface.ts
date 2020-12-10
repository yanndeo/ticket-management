import { UserRole } from 'src/user/entities/user.entity';

export interface PayloadInterface {
  username: string;
  email: string;
  roles: UserRole[];
}
