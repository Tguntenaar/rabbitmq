import { CreateEdgeInput } from './create-edge.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  id: string;
}
