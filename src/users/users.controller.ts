import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }
  
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto).then(user => {
      const { password, ...result } = user;
      return result;
    });
  }
  
  @Get()
  findAll() {
    return this.service.findAll().then(users => users.map(user => {
      const { password, ...result } = user;
      return result;
    }));
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
