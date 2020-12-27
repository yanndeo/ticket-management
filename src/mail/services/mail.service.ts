import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { mail_queue_name } from 'src/utils';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(mail_queue_name)
    private mailQueue: Queue,
  ) {}

  /** Send email confirmation link to new user account. */
  async sendConfirmationEmail(
    user: Partial<UserEntity>,
    code: string,
  ): Promise<boolean> {
    try {
      await this.mailQueue.add(
        'confirmation',
        { user, code },
        { delay: 10000 }, //10s delayed
      );
      return true;
    } catch (error) {
      // this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false;
    }
  }
}
