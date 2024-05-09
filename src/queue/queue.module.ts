import { Module } from '@nestjs/common';
import { QueueHandler } from './queue.service';
import { PrismaClient } from '@prisma/client';

@Module({})
export class QueueModule {
  providers: [QueueHandler, PrismaClient];
}
