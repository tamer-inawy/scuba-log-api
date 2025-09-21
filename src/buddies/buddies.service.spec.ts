import { Test, TestingModule } from '@nestjs/testing';
import { BuddiesService } from './buddies.service';

describe('BuddiesService', () => {
  let service: BuddiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuddiesService],
    }).compile();

    service = module.get<BuddiesService>(BuddiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
