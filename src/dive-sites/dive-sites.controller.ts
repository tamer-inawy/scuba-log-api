import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DiveSitesService } from './dive-sites.service';
import { CreateDiveSiteDto } from './dto/create-dive-site.dto';
import { UpdateDiveSiteDto } from './dto/update-dive-site.dto';

@Controller('dive-sites')
export class DiveSitesController {
  constructor(private readonly service: DiveSitesService) {}

  @Post()
  create(@Body() dto: CreateDiveSiteDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDiveSiteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
