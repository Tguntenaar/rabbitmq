import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';
import { PrismaClient } from '@prisma/client';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'edge_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [EdgeResolver, EdgeService, PrismaClient],
})
export class EdgeModule {}
