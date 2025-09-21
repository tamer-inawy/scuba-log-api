import { Test, TestingModule } from '@nestjs/testing';
import { BuddiesController } from './buddies.controller';

describe('BuddiesController', () => {
  let controller: BuddiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuddiesController],
    }).compile();

    controller = module.get<BuddiesController>(BuddiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
