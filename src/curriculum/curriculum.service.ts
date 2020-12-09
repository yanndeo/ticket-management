import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDTO } from './dto/Add-cv-dto';
import { CurriculumEntity } from './entities/curriculum.entity';
import { UpdateCvDTO } from './dto/Update-cv-dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(CurriculumEntity)
    private curriculumRepository: Repository<CurriculumEntity>,
    private userService: UserService,
  ) {}

  //factorize function
  async findById(_id: number, user: UserEntity): Promise<CurriculumEntity> {
    const curriculum = await this.curriculumRepository.findOne(_id);

    if (!curriculum) {
      throw new NotFoundException(` curriculum ${_id} doesn't exist`);
    }

    if (await this.userService.isOwnerOrAdmin(curriculum, user)) {
      return await curriculum;
    } else {
      throw new UnauthorizedException();
    }
  }

  //Get all cv from database
  async findAll(): Promise<CurriculumEntity[]> {
    return await this.curriculumRepository.find();
  }

  //Create new cv
  async add(addcvdto: AddCvDTO, user): Promise<CurriculumEntity> {
    const newCv = await this.curriculumRepository.create(addcvdto);
    newCv.user = user;
    return await this.curriculumRepository.save(newCv);
  }

  //Maj Cv by his id (patch)
  // eslint-disable-next-line prettier/prettier
  async update(id: number, updatecvdto: UpdateCvDTO, user: UserEntity): Promise<CurriculumEntity> {
    const newCurriculum = await this.curriculumRepository.preload({ id, ...updatecvdto});
    //Test if is not exist (id is not in database)
    if (!newCurriculum) {
      throw new NotFoundException(`curriculum ${id} doesn't exist`);
    }

    console.log({ ...updatecvdto });

    if (await this.userService.isOwnerOrAdmin(newCurriculum, user)) {
      return await this.curriculumRepository.save(newCurriculum);
    } else {
      throw new UnauthorizedException();
    }
  }

  //Using criteria to update entities
  async updateByCriteria(criteria: any, data: UpdateCvDTO): Promise<any> {
    return await this.curriculumRepository.update(criteria, data);
  }

  //Delete with remove .param  is entities or list of entities
  async remove(id: number, user: UserEntity): Promise<CurriculumEntity> {
    const cvToRemove = await this.findById(id, user);
    return await this.curriculumRepository.remove(cvToRemove);
  }

  //Flexible Delete by criteria. Criteria can be id or array [id1, id2, ..]; object {job: stagiaire}
  async delete(criteria: any): Promise<any> {
    return await this.curriculumRepository.delete(criteria);
  }

  //soft remove with criteria
  async sofDelete(id: number, user: UserEntity): Promise<any> {
    const curriculum = await this.findById(id, user);
    return await this.curriculumRepository.softDelete(curriculum.id); //softDelete([58, 59])
  }

  //recover cv delete with remove meth.
  async restore(id: number, user: UserEntity): Promise<any> {
    const curriculum = await this.curriculumRepository.query(
      'select * from curriculum where id = ?',
      [id],
    );
    console.log(curriculum);
    if (!curriculum) {
      throw new NotFoundException(`curriculum ${id} doesn't exist`);
    }

    if (await this.userService.isOwnerOrAdmin(curriculum, user)) {
      return await this.curriculumRepository.restore(curriculum.id);
    } else {
      throw new UnauthorizedException();
    }
  }

  //create query builder
  async groupCvNumberByAge() {
    // creer un queryBuilder
    const qb = this.curriculumRepository.createQueryBuilder('cv');
    // cherchez/grouper le nombre de cv par age
    // eslint-disable-next-line prettier/prettier
          qb.select("cv.job, count(cv.id) as nombreDeCV")
            .groupBy('cv.job');
    console.log(qb.getSql());
    return await qb.getRawMany();

    /* qb.select('cv.job, count(cv.id) as nombreDeCV')
      .groupBy('cv.job'); */
  }

  // eslint-disable-next-line prettier/prettier
  getOwnerAll = async (user: Partial<UserEntity>): Promise<CurriculumEntity[]> => {

    const qb = this.curriculumRepository.createQueryBuilder('cv');
    qb.where('cv.user = :user', { user: user.id }).orderBy('cv.id', 'DESC');
    //console.log(qb.getSql());
    return await qb.getMany();
  };
}
