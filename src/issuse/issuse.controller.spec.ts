import { Test, TestingModule } from '@nestjs/testing';
import { IssuseController } from './issuse.controller';

describe('IssuseController', () => {
  let controller: IssuseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuseController],
    }).compile();

    controller = module.get<IssuseController>(IssuseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
