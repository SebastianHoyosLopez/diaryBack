import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SerenatasService } from '../services/serenatas.service';
import { FilterSerenatasDto, SerenataDto, UpdateSerenataDto } from '../dtos/serenata.dtos';
import { IResponse } from 'src/utils/interFaces';
import { Index } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

// @UseGuards(JwtAuthGuard)
@Controller('serenatas')
export class SerenatasController {
  constructor(private serenatasService: SerenatasService) {}

  @Public()
  @Get()
  async getSerenatas(
    @Query() params: FilterSerenatasDto
  ) {
    return await this.serenatasService.findAll(params);
  }
  @Public()
  @Get('history') 
  async getRecordSerenatas(
    @Query() params: FilterSerenatasDto
  ) {
    return await this.serenatasService.findRecord(params);
  }

  @Public()
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
