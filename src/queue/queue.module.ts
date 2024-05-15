import { Module } from '@nestjs/common';
import { QueueHandler } from './queue.handler.service';
import { PublisherService } from './publisher.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [QueueHandler, PrismaClient, PublisherService],
  // Makes it possible to inject the PublisherService into other modules
  exports: [PublisherService],
})
export class QueueModule {}
