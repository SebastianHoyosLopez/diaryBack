import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SerenatasService } from '../services/serenatas.service';
import { SerenataDto, UpdateSerenataDto } from '../dtos/serenata.dtos';
import { IResponse } from 'src/utils/interFaces';

@Controller('serenatas')
export class SerenatasController {
  constructor(private serenatasService: SerenatasService) {}

  @Get()
  async getSerenatas() {
    return await this.serenatasService.findAll();
  }

  @Get('history')
  async getRecordSerenatas() {
    return await this.serenatasService.findRecord();
  }

  @Get(':id')
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
