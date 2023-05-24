import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SerenatasService } from '../services/serenatas.service';
import { FilterSerenatasDto, SerenataDto, UpdateSerenataDto } from '../dtos/serenata.dtos';
import { IResponse } from 'src/utils/interFaces';
import { Index } from 'typeorm';

@Controller('serenatas')
export class SerenatasController {
  constructor(private serenatasService: SerenatasService) {}

  @Get()
  async getSerenatas(
    @Query() params: FilterSerenatasDto
  ) {
    return await this.serenatasService.findAll(params);
  }

  @Get('history') 
  async getRecordSerenatas(
    @Query() params: FilterSerenatasDto
  ) {
    return await this.serenatasService.findRecord(params);
  }

  @Get(':id')
  @Index()
  async getOneSerenata(@Param('id') id: string) {
    return await this.serenatasService.findOneSerenata(id);
  }

  @Post()
  async create(@Body() serenataDto: SerenataDto) {
    const result = await this.serenatasService.create(serenataDto);
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateSerenataDto) {
    return this.serenatasService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // return this.serenatasService.remove(+id);
    const serenataId = id;
    const result = await this.serenatasService.remove(serenataId);
    const response: IResponse = {
      data: result,
      error: null,
      message: 'Serenata eliminada',
    };
    return response;
  }
}
