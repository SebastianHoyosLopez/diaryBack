import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from '../dtos/userDto';
import { ResponsibleOfService } from './responsible-of.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
    private responsibleOfService: ResponsibleOfService,
  ) {}

  async getMany(): Promise<UserEntity[]> {
    return await this.usersRepo
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.responsibleOf', 'responsibleOf')
      .getMany();
  }

  async getOne(filter: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.usersRepo.findOne(filter);
  }

  async getOneOrFail(filter?: FindOneOptions<UserEntity>) {
    const userExist = await this.getOne(filter);
    if (!userExist) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.CONFLICT);
    }
    return userExist;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userExist = await this.getOneOrFail({
      where: { id: userId },
    });
    return userExist;
  }

  async create(data: UserDto) {
    const newUser = this.usersRepo.create(data);

    if (data.responsibleOfId) {
      const responsibleOf = await this.responsibleOfService.findOne(
        data.responsibleOfId);
        newUser.responsibleOf = responsibleOf
    }

    return this.usersRepo.save(newUser);
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.getUserById(id);
    this.usersRepo.merge(user, changes);
    return this.usersRepo.save(user);
  }

  async remove(id: string) {
    const userExist = await this.getOneOrFail({
      where: { id: id },
    });

    return await this.usersRepo.softDelete({ id: userExist.id });
  }
}
