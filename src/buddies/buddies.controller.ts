import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { BuddiesService } from './buddies.service';
import { CreateBuddyDto } from './dto/create-buddy.dto';
import { UpdateBuddyDto } from './dto/update-buddy.dto';

@Controller('buddies')
export class BuddiesController {
  constructor(private readonly service: BuddiesService) {}

  @Post()
  create(@Body() dto: CreateBuddyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.service.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBuddyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
