import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiveLog } from './dive-log.entity';
import { CreateDiveLogDto } from './dto/create-dive-log.dto';
import { UpdateDiveLogDto } from './dto/update-dive-log.dto';

@Injectable()
export class DiveLogsService {
  constructor(
    @InjectRepository(DiveLog)
    private repo: Repository<DiveLog>,
  ) { }

  create(dto: CreateDiveLogDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll(userId: number) {
    return this.repo.find({ where: { userId }, relations: ['diveSite', 'buddyConnections', 'user'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['diveSite', 'buddyConnections', 'user'] });
  }

  update(id: number, dto: UpdateDiveLogDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
