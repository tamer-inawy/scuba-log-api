import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiveSite } from './dive-site.entity';
import { CreateDiveSiteDto } from './dto/create-dive-site.dto';
import { UpdateDiveSiteDto } from './dto/update-dive-site.dto';

@Injectable()
export class DiveSitesService {
  constructor(
    @InjectRepository(DiveSite)
    private repo: Repository<DiveSite>,
  ) {}

  create(dto: CreateDiveSiteDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateDiveSiteDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
