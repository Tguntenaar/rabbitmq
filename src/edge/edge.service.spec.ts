import { Test, TestingModule } from '@nestjs/testing';
import { EdgeService } from './edge.service';
import { PrismaClient } from '@prisma/client';
import { EdgeResolver } from './edge.resolver';
import { PublisherService } from '../queue/publisher.service';

describe('EdgeService', () => {
  let service: EdgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdgeResolver, EdgeService, PrismaClient, PublisherService],
    }).compile();

    service = module.get<EdgeService>(EdgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
