import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DiveLog } from './dive-log.entity';
import { CreateDiveLogDto } from './dto/create-dive-log.dto';
import { UpdateDiveLogDto } from './dto/update-dive-log.dto';
import { BuddiesService } from 'src/buddies/buddies.service';

@Injectable()
export class DiveLogsService {
  constructor(
    @InjectRepository(DiveLog)
    private repo: Repository<DiveLog>,
    private buddiesService: BuddiesService,
  ) { }

  async create(dto: CreateDiveLogDto) {
    const entity = this.repo.create(dto);
    const buddies = await this.buddiesService.findByIds(dto.buddyIds || []);
    entity.buddies = buddies;
    return this.repo.save(entity);
  }

  findAll(userId: number) {
    return this.repo.find({ where: { userId }, relations: ['diveSite', 'buddies', 'user'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['diveSite', 'buddies', 'user'] });
  }

  update(id: number, dto: UpdateDiveLogDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
