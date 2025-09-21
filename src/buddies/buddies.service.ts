import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buddy } from './buddy.entity';
import { CreateBuddyDto } from './dto/create-buddy.dto';
import { UpdateBuddyDto } from './dto/update-buddy.dto';

@Injectable()
export class BuddiesService {
  constructor(
    @InjectRepository(Buddy)
    private repo: Repository<Buddy>,
  ) {}

  create(dto: CreateBuddyDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, dto: UpdateBuddyDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
