import { Test, TestingModule } from '@nestjs/testing';
import { DiveLogsController } from './dive-logs.controller';

describe('DiveLogsController', () => {
  let controller: DiveLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiveLogsController],
    }).compile();

    controller = module.get<DiveLogsController>(DiveLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
