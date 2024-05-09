import { Test, TestingModule } from '@nestjs/testing';
import { EdgeResolver } from './edge.resolver';
import { EdgeService } from './edge.service';

describe('EdgeResolver', () => {
  let resolver: EdgeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdgeResolver, EdgeService],
    }).compile();

    resolver = module.get<EdgeResolver>(EdgeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
