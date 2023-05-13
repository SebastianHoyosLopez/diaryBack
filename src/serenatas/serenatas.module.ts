import { Module } from '@nestjs/common';
import { SerenatasController } from './controllers/serenatas.controller';
import { SerenatasService } from './services/serenatas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerenataEntity } from './entities/serenata.entity';
import { ResponsibleOfEntity } from 'src/users/entities/responsibleOf.entity';
import { ResponsibleOfController } from 'src/users/controllers/responsible-of.controller';
import { ResponsibleOfService } from 'src/users/services/responsible-of.service';

@Module({
  imports: [TypeOrmModule.forFeature([SerenataEntity, ResponsibleOfEntity])],
  controllers: [SerenatasController, ResponsibleOfController],
  providers: [SerenatasService, ResponsibleOfService],
  exports: [SerenatasService]
})
export class SerenatasModule {}
