import { FastifyAdapter } from '@nestjs/platform-fastify';
import { v4 as uuid } from 'uuid';

export class FastifyConfigApp extends FastifyAdapter {
  constructor() {
    super({
      logger: true,
      genReqId: () => uuid(),
    });
  }
}
