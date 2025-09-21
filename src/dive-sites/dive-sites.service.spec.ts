import { Test, TestingModule } from '@nestjs/testing';
import { DiveSitesService } from './dive-sites.service';

describe('DiveSitesService', () => {
  let service: DiveSitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiveSitesService],
    }).compile();

    service = module.get<DiveSitesService>(DiveSitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
