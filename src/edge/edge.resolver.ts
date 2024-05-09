import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Resolver('Edge')
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Mutation('createEdge')
  create(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return this.edgeService.create(createEdgeInput);
  }

  @Query('edge')
  findAll() {
    return this.edgeService.findAll();
  }

  @Query('edge')
  findOne(@Args('id') id: number) {
    return this.edgeService.findOne(id);
  }

  @Mutation('updateEdge')
  update(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return this.edgeService.update(updateEdgeInput.id, updateEdgeInput);
  }

  @Mutation('removeEdge')
  remove(@Args('id') id: number) {
    return this.edgeService.remove(id);
  }
}
