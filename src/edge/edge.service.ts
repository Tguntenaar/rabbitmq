import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EdgeService {
  constructor(
    private readonly prisma: PrismaClient,
    @Inject('LOGGER_SERVICE') private client: ClientProxy,
  ) {
    Logger.log('info');
  }
  create(createEdgeInput: CreateEdgeInput) {
    // Send the object to a RabbitMQ queue
    this.client.emit('edge_queue', createEdgeInput);
    return this.prisma.edge.create({
      data: {
        ...createEdgeInput,
        capacity: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
      },
    });
  }

  findAll() {
    return this.prisma.edge.findMany();
  }

  findOne(id: string) {
    return this.prisma.edge.findUnique({ where: { id } });
  }

  update(id: string, updateEdgeInput: UpdateEdgeInput) {
    return this.prisma.edge.update({
      where: { id },
      data: updateEdgeInput,
    });
  }

  remove(id: string) {
    return this.prisma.edge.delete({ where: { id } });
  }
}
