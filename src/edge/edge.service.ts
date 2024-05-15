import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { Edge as PrismaEdge, PrismaClient } from '@prisma/client';
import { PublisherService } from '../queue/publisher.service';
import { EdgeWithPeers } from './types/edge';
@Injectable()
export class EdgeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly queuePublisher: PublisherService,
  ) {
    Logger.log('Initialized EdgeService');
  }
  async create(createEdgeInput: CreateEdgeInput): Promise<EdgeWithPeers> {
    const now = new Date().toISOString();
    const newEdge: PrismaEdge = await this.prisma.edge.create({
      data: {
        ...createEdgeInput,
        capacity: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
        created_at: now,
        updated_at: now,
      },
    });

    // Send the object to a RabbitMQ queue
    this.queuePublisher.addEdgeToQueue(newEdge);

    return {
      ...newEdge,
      // NOTE: These aliases are not updated yet.
      edge_peers: `${newEdge.node1_alias}-${newEdge.node2_alias}`,
    };
  }

  async findAll(): Promise<EdgeWithPeers[]> {
    const edges = await this.prisma.edge.findMany();
    return edges.map((edge) => ({
      ...edge,
      edge_peers: `${edge.node1_alias}-${edge.node2_alias}`,
    }));
  }

  async findOne(id: string): Promise<EdgeWithPeers> {
    try {
      const edge = await this.prisma.edge.findUnique({ where: { id } });
      return {
        ...edge,
        edge_peers: `${edge.node1_alias}-${edge.node2_alias}`,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Edge not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
