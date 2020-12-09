import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CurriculumEntity } from '../entities/curriculum.entity';
import { CinGeneratorService } from '../../helpers/cin-generator/cin-generator.service';

@EventSubscriber()
export class CurriculumSubscriber
  implements EntitySubscriberInterface<CurriculumEntity> {
  
  private cinGenerator: CinGeneratorService;

  constructor(connection: Connection, cinGenerator: CinGeneratorService) {
    connection.subscribers.push(this);
    this.cinGenerator = cinGenerator;
  }

  listenTo() {
    return CurriculumEntity;
  }

  async beforeInsert(event: InsertEvent<CurriculumEntity>): Promise<CurriculumEntity> {
    console.log(`BEFORE CV INSERTED:`, event.entity);
    const cv = event.entity;
    cv.cin = await this.cinGenerator.handle();
    return cv;
  }
}
