import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class QueueHandler implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(QueueHandler.name);
  constructor(private readonly prisma: PrismaClient) {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel();
    Logger.log('Initialized QueueHandler Service');
  }

  public async onModuleInit() {
    Logger.log('onModuleInit QueueHandler');
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('edgeQueue', { durable: true });
        await channel.consume('edgeQueue', async (message) => {
          if (message) {
            const content = JSON.parse(message.content.toString());
            this.logger.log(
              `New channel between ${content.node1_alias} and ${content.node2_alias} with a \
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
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}
