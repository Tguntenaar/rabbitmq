import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';
import { PrismaClient } from '@prisma/client';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [EdgeResolver, EdgeService, PrismaClient],
})
export class EdgeModule {}
