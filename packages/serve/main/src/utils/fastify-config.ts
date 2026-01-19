import { RequestContext } from '@booking/serve-core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { v4 as uuid } from 'uuid';

export class FastifyConfigApp extends FastifyAdapter {
    constructor() {
        super({
            logger: true,
            genReqId: () => uuid(),
            bodyLimit: 10485760, // 10MB
        });

        this.registerHook();
    }

    private registerHook() {
        this.getInstance().addHook(
            'onRequest',
            (req: any, reply: any, done: any) => {
                RequestContext.fastifyHook(req, reply, done);
            },
        );
    }
}
