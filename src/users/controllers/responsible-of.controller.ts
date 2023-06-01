import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

import { ResponsibleOfService } from '../services/responsible-of.service';
import {
  ResponsibleOfDto,
  UpdateResponsibleOfDto,
} from '../dtos/responsibleOfDto';
import { ApikeyGuard } from 'src/auth/guards/apikey.guard';
import { Public } from 'src/auth/decorators/public.decorator';

// @UseGuards(ApikeyGuard)
@Controller('responsible-of')
export class ResponsibleOfController {
  constructor(private responsibleOfService: ResponsibleOfService) {}

  // @Public()
  @Get()
  findAll() {
    return this.responsibleOfService.findAll();
  }

  // @Public() // se puede reemplazar con el siguiente directamente @SetMetadata('isPublic', true)
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
