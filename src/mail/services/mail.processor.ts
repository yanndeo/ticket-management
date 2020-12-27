import { MailerService } from '@nestjs-modules/mailer';
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueWaiting,
} from '@nestjs/bull';
import { Job } from 'bull';
import { mail_queue_name } from 'src/utils';
import { UserEntity } from 'src/user/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';

@Processor(mail_queue_name)
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueWaiting()
  onWaiting(job: Job) {
    this.logger.debug(
      `Waiting job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('confirmation')
  async sendWelcomeEmail(
    job: Job<{ user: UserEntity; code: string }>,
  ): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.user.email}'`);

    const url = `${process.env.BASE_URL}/${process.env.APP_PREFIX}/auth/${job.data.code}/confirm`;

    try {
      const result = await this.mailerService.sendMail({
        template: 'confirmation',
        context: {
          ...plainToClass(UserEntity, job.data.user),
          url: url,
        },
        subject: `Welcome to ${process.env.BASE_URL}! Please Confirm Your Email Address`,
        to: job.data.user.email,
      });
      console.log(result);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to send confirmation email to '${job.data.user.email}'`,
        error.stack,
      );
      throw error;
    }
  }
}
