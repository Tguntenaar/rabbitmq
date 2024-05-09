import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class QueueHandler implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(QueueHandler.name);
  constructor(private readonly prisma: PrismaClient) {
    const connection = amqp.connect(['amqp://localhost:5672']);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    this.logger.log('info');
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('edge_queue', { durable: false });
        await channel.consume('edge_queue', async (message) => {
          if (message) {
            const content = JSON.parse(message.content.toString());
            this.logger.log(content);
            this.logger.log(
              `New channel between [node1_alias] and [node2_alias] with a \
              capacity of [capacity] has been created.`,
            );
            // Update the edge in the database
            this.prisma.edge.update({
              where: {
                id: 'edge_id',
              },
              data: {
                node1_alias: 'node1_alias-updated',
                node2_alias: 'node2_alias-updated',
              },
            });
            channel.ack(message);
          }
        });
      });
      console.log('Consumer service started and listening for messages.');
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}
