import { Test, TestingModule } from '@nestjs/testing';
import { SkyrockService } from './skyrock.service';

describe('SkyrockService', () => {
  let service: SkyrockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkyrockService],
    }).compile();

    service = module.get<SkyrockService>(SkyrockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
