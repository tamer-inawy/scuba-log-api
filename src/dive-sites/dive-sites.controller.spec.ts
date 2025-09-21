import { Test, TestingModule } from '@nestjs/testing';
import { DiveSitesController } from './dive-sites.controller';

describe('DiveSitesController', () => {
  let controller: DiveSitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiveSitesController],
    }).compile();

    controller = module.get<DiveSitesController>(DiveSitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
