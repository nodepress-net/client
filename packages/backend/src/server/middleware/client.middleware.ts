// ====================================
// Este es un Middleware que se encarga
// de agregar un identificador único
// a cada solicitud entrante.
// ====================================

import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
	constructor() {}

	async use(req: any, res: Response, next: () => void) {
		const id = randomUUID();
		req[CORRELATION_ID_HEADER] = id;
		res.setHeader(CORRELATION_ID_HEADER, id);

		next();
	}
}
