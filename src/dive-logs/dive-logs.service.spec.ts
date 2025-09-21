import { Test, TestingModule } from '@nestjs/testing';
import { DiveLogsService } from './dive-logs.service';

describe('DiveLogsService', () => {
  let service: DiveLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiveLogsService],
    }).compile();

    service = module.get<DiveLogsService>(DiveLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
