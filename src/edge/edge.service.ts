import { Injectable, Logger } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { Edge as PrismaEdge, PrismaClient } from '@prisma/client';
import { PublisherService } from '../queue/publisher.service';

export interface EdgeWithPeers extends PrismaEdge {
  edge_peers: string;
}

@Injectable()
export class EdgeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly queuePublisher: PublisherService,
  ) {
    Logger.log('Initialized EdgeService');
  }
  create(createEdgeInput: CreateEdgeInput) {
    // Send the object to a RabbitMQ queue
    this.queuePublisher.addEdgeToQueue(createEdgeInput);
    const now = new Date().toISOString();
    return this.prisma.edge.create({
      data: {
        ...createEdgeInput,
        capacity: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
        created_at: now,
        updated_at: now,
      },
    });
  }

  async findAll(): Promise<EdgeWithPeers[]> {
    const edges = await this.prisma.edge.findMany();
    return edges.map((edge) => ({
      ...edge,
      edge_peers: `${edge.node1_alias}-${edge.node2_alias}`,
    }));
  }

  async findOne(id: string): Promise<EdgeWithPeers> {
    const edge = await this.prisma.edge.findUnique({ where: { id } });
    return {
      ...edge,
      edge_peers: `${edge.node1_alias}-${edge.node2_alias}`,
    };
  }
}
