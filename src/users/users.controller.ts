import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }
  
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto).then(user => {
      const { passwordHash, ...result } = user;
      return result;
    });
  }
  
  @Get()
  findAll() {
    return this.service.findAll().then(users => users.map(user => {
      const { passwordHash, ...result } = user;
      return result;
    }));
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id).then(user => {
      const { passwordHash, ...result } = { ...user };
      return result;
    });
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
