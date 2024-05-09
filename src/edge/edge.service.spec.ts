import { Test, TestingModule } from '@nestjs/testing';
import { EdgeService } from './edge.service';
import { PrismaClient } from '@prisma/client';

describe('EdgeService', () => {
  let service: EdgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EdgeService,
        PrismaClient,
        { provide: 'LOGGER_SERVICE', useValue: {} },
      ],
    }).compile();

    service = module.get<EdgeService>(EdgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
