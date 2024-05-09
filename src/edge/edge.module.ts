import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [EdgeResolver, EdgeService, PrismaClient],
})
export class EdgeModule {}
