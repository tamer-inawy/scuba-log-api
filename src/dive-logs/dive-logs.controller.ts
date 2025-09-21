import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DiveLogsService } from './dive-logs.service';
import { CreateDiveLogDto } from './dto/create-dive-log.dto';
import { UpdateDiveLogDto } from './dto/update-dive-log.dto';

@Controller('dive-logs')
export class DiveLogsController {
  constructor(private readonly service: DiveLogsService) {}

  @Post()
  create(@Body() dto: CreateDiveLogDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateDiveLogDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
