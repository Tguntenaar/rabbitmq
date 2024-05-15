import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreateEdgeInput } from 'src/edge/dto/create-edge.input';

@Injectable()
export class PublisherService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('edgeQueue', { durable: true });
      },
    });
    Logger.log('Initialized PublisherService');
  }

  async addEdgeToQueue(edge: CreateEdgeInput) {
    try {
      await this.channelWrapper.sendToQueue(
        'edgeQueue',
        Buffer.from(JSON.stringify(edge)),
        {
          timeout: 10000, // TODO 10 seconds
        },
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException(
        'Error adding edge to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
