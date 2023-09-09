import { Test, TestingModule } from '@nestjs/testing';
import { FeatureprojectService } from './featureproject.service';

describe('FeatureprojectService', () => {
  let service: FeatureprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureprojectService],
    }).compile();

    service = module.get<FeatureprojectService>(FeatureprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
