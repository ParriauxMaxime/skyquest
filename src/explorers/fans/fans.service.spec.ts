import { Test, TestingModule } from '@nestjs/testing';
import { FansService } from './fans.service';

describe('FansService', () => {
  let service: FansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FansService],
    }).compile();

    service = module.get<FansService>(FansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
