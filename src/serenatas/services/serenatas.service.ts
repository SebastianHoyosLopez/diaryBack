import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SerenataEntity } from '../entities/serenata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  SerenataDto,
  UpdateSerenataDto,
  FilterSerenatasDto,
} from '../dtos/serenata.dtos';
import { ResponsibleOfService } from 'src/users/services/responsible-of.service';

@Injectable()
export class SerenatasService {
  constructor(
    @InjectRepository(SerenataEntity)
    private readonly serenataRepo: Repository<SerenataEntity>,
    private readonly responsibleOfService: ResponsibleOfService,
  ) {}

  async findAll(params?: FilterSerenatasDto): Promise<SerenataEntity[]> {
    // const findOptions: FindManyOptions<SerenataEntity> = {
    //   relations: ['responsibleOf'],
    //   order: { date: 'ASC', hour: 'ASC' },
    // };
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (params) {
      const { limit, offset } = params;
      return this.serenataRepo.find({
        relations: ['responsibleOf'],
        order: { date: 'ASC', hour: 'ASC' },
        where: {
          date: MoreThan(yesterday.toISOString()),
        },
        take: limit,
        skip: offset,
      });
    }
    const query = this.serenataRepo
      .createQueryBuilder('serenata')
      .leftJoinAndSelect('serenata.responsibleOf', 'responsibleOf')
      .where({
        date: MoreThan(yesterday.toISOString()),
      })
      .orderBy('date', 'ASC')
      .addOrderBy('hour', 'ASC');

    return await query.getMany();
  }

  async findRecord(params?: FilterSerenatasDto) {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (params) {
      const { limit, offset } = params;
      return this.serenataRepo.find({
        relations: ['responsibleOf'],
        order: { date: 'DESC', hour: 'DESC' },
        where: {
          date: LessThanOrEqual(yesterday.toISOString()),
        },
        take: limit,
        skip: offset,
      }); 
    }

    return await this.serenataRepo
      .createQueryBuilder('serenatas')
      .leftJoinAndSelect('serenatas.responsibleOf', 'responsibleOf')
      .where({
        date: LessThanOrEqual(yesterday.toISOString()),
      })
      .orderBy('date', 'DESC')
      .addOrderBy('hour', 'DESC')
      .getMany();
  }

  async findOne(
    filter: FindOneOptions<SerenataEntity>,
  ): Promise<SerenataEntity> {
    return await this.serenataRepo.findOne(filter);
  }

  async findOneOrFail(
    filter?: FindOneOptions<SerenataEntity>,
  ): Promise<SerenataEntity> {
    const serenataExist = await this.findOne(filter);
    if (!serenataExist) {
      throw new HttpException('SERENATA_NOT_FOUND', HttpStatus.CONFLICT);
    }
    return serenataExist;
  }

  async findOneSerenata(id: string) {
    const serenata = await this.findOneOrFail({
      where: {
        id: id,
      },
    });
    return serenata;
  }

  async create(data: SerenataDto): Promise<SerenataEntity> {
    const serenata = plainToClass(SerenataDto, data);
    const errors = await validate(serenata);
    if (errors.length > 0) {
      throw new HttpException(
        { errors: errors.map((e) => e.constraints) },
        HttpStatus.BAD_REQUEST,
      );
    }
    const serenataExist = await this.findOne({
      where: { date: data.date, hour: data.hour },
    });

    if (serenataExist) {
      throw new HttpException('SERENATA_EXISTS', HttpStatus.CONFLICT);
    }

    const newSerenata = this.serenataRepo.create({
      ...data,
    });

    if (data.responsibleOfId) {
      const responsibleOf = await this.responsibleOfService.findOne(
        data.responsibleOfId,
      );
      newSerenata.responsibleOf = responsibleOf;
    }

    await this.serenataRepo.save(newSerenata);
    return newSerenata;
  }

  async update(id: string, changes: UpdateSerenataDto) {
    const serenata = await this.serenataRepo.findOne({ where: { id: id } });

    if (changes.responsibleOfId) {
      const responsibleOf = await this.responsibleOfService.findOne(
        changes.responsibleOfId,
      );
      serenata.responsibleOf = responsibleOf;
    }

    this.serenataRepo.merge(serenata, changes);
    return this.serenataRepo.save(serenata);
  }

  async remove(id): Promise<any> {
    const serenataExist = await this.findOneOrFail({
      where: { id: id },
    });
    return await this.serenataRepo.softDelete({ id: serenataExist.id });
  }
}
