import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { CreateEdgeInput } from './dto/create-edge.input';
import { GetEdgeInput } from './dto/get-edge.input';

@Resolver('Edge')
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Mutation('createEdge')
  create(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return this.edgeService.create(createEdgeInput);
  }

  @Query('getEdges')
  findAll() {
    return this.edgeService.findAll();
  }

  @Query('getEdge')
  findOne(@Args('getEdgeInput') getEdgeInput: GetEdgeInput) {
    return this.edgeService.findOne(getEdgeInput.id);
  }
}
