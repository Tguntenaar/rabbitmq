import { Test, TestingModule } from '@nestjs/testing';
import { EdgeResolver } from './edge.resolver';
import { EdgeService } from './edge.service';
import { PrismaClient } from '@prisma/client';
import { PublisherService } from '../queue/publisher.service';

describe('EdgeResolver', () => {
  let resolver: EdgeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdgeResolver, EdgeService, PrismaClient, PublisherService],
    }).compile();

    resolver = module.get<EdgeResolver>(EdgeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
