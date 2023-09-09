import { Test, TestingModule } from '@nestjs/testing';
import { IssuseService } from './issuse.service';

describe('IssuseService', () => {
  let service: IssuseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuseService],
    }).compile();

    service = module.get<IssuseService>(IssuseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
