import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';

@Module({
  providers: [EdgeResolver, EdgeService],
})
export class EdgeModule {}
