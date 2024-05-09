import { Injectable } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Injectable()
export class EdgeService {
  create(createEdgeInput: CreateEdgeInput) {
    return 'This action adds a new edge';
  }

  findAll() {
    return `This action returns all edge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edge`;
  }

  update(id: number, updateEdgeInput: UpdateEdgeInput) {
    return `This action updates a #${id} edge`;
  }

  remove(id: number) {
    return `This action removes a #${id} edge`;
  }
}
