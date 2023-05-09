import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ResponsibleOfController } from './controllers/responsible-of.controller';
import { ResponsibleOfService } from './services/responsible-of.service';
import { ResponsibleOfEntity } from './entities/responsibleOf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResponsibleOfEntity])],
  controllers: [UsersController, ResponsibleOfController],
  providers: [UsersService, ResponsibleOfService]
})
export class UsersModule {}
