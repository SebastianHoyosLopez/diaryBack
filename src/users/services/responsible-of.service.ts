import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsibleOfEntity } from '../entities/responsibleOf.entity';
import { Repository } from 'typeorm';
import { ResponsibleOfDto, UpdateResponsibleOfDto } from '../dtos/responsibleOfDto'

@Injectable()
export class ResponsibleOfService {
  constructor(
    @InjectRepository(ResponsibleOfEntity)
    private responsibleOfRepo: Repository<ResponsibleOfEntity>,
  ) {}

  async findAll() {
    const currentDate = new Date();
    return await this.responsibleOfRepo
      .createQueryBuilder('responsibleOf')
      .leftJoinAndSelect('responsibleOf.serenatas', 'serenatas')
      .where('serenatas.date >= :currentDate', { currentDate: currentDate.toISOString().split('T')[0] })
      .orderBy('serenatas.date', 'ASC')
      .getMany()

  }

  async findOne(id: number) {
    const responsibleOf = await this.responsibleOfRepo
      .createQueryBuilder('responsibleOf')
      .where('responsibleOf.id = :id', { id })
      .getOne();

    if (!responsibleOf) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return responsibleOf;
  }

  async create(data: ResponsibleOfDto) {
    const newCustomer = await this.responsibleOfRepo.create(data);
    return this.responsibleOfRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateResponsibleOfDto) {
    const responsibleOf = await this.findOne(id);
    this.responsibleOfRepo.merge(responsibleOf, changes);
    return this.responsibleOfRepo.save(responsibleOf);
  }

  remove(id: number) {
    return this.responsibleOfRepo.delete(id);
  }

}
