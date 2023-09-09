import { Test, TestingModule } from '@nestjs/testing';
import { FeatureprojectController } from './featureproject.controller';

describe('FeatureprojectController', () => {
  let controller: FeatureprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureprojectController],
    }).compile();

    controller = module.get<FeatureprojectController>(FeatureprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
