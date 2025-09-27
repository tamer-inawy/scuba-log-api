import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Buddy } from './buddy.entity';
import { CreateBuddyDto } from './dto/create-buddy.dto';
import { UpdateBuddyDto } from './dto/update-buddy.dto';
import { DiveLogsService } from '../dive-logs/dive-logs.service';

@Injectable()
export class BuddiesService {
  constructor(
    @InjectRepository(Buddy)
    private repo: Repository<Buddy>,
    @Inject(forwardRef(() => DiveLogsService))
    private diveLogsService: DiveLogsService,
  ) { }

  create(dto: CreateBuddyDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ relations: ['linkedUser', 'diveLogs'] });
  }

  async findByUserId(userId: number) {
    const logIds = (await this.diveLogsService.findAll(userId)).map(log => log.id);
    return this.repo.find({ where: { diveLogs: {id: In(logIds)} }, relations: ['linkedUser', 'diveLogs'] });
  }

  findByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['linkedUser'] });
  }

  update(id: number, dto: UpdateBuddyDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
