import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ResponsibleOfService } from '../services/responsible-of.service';
import {
  ResponsibleOfDto,
  UpdateResponsibleOfDto,
} from '../dtos/responsibleOfDto';

@Controller('responsible-of')
export class ResponsibleOfController {
  constructor(private responsibleOfService: ResponsibleOfService) {}

  @Get()
  findAll() {
    return this.responsibleOfService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.responsibleOfService.findOne(id);
  }

  @Post()
  create(@Body() payload: ResponsibleOfDto) {
    return this.responsibleOfService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateResponsibleOfDto,
  ) {
    return this.responsibleOfService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.responsibleOfService.remove(+id);
  }
}
