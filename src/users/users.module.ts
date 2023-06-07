import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ResponsibleOfController } from './controllers/responsible-of.controller';
import { ResponsibleOfService } from './services/responsible-of.service';
import { ResponsibleOfEntity } from './entities/responsibleOf.entity';
import { SerenatasModule } from 'src/serenatas/serenatas.module';
import { SerenatasController } from 'src/serenatas/controllers/serenatas.controller';
import { SerenatasService } from 'src/serenatas/services/serenatas.service';
import { SerenataEntity } from 'src/serenatas/entities/serenata.entity';

@Module({
  imports: [
    SerenatasModule,
    TypeOrmModule.forFeature([UserEntity, ResponsibleOfEntity, SerenataEntity]),
  ],
  controllers: [UsersController, ResponsibleOfController, SerenatasController],
  providers: [UsersService, ResponsibleOfService, SerenatasService],
  exports: [UsersService],
})
export class UsersModule {}
