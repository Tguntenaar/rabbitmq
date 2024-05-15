import { Edge } from '@prisma/client';

export interface EdgeWithPeers extends Edge {
  edge_peers: string;
}
