// ====================================
// Este es un Interceptor que se encarga
// de limitar la cantidad de solicitudes
// ====================================

import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { ErrorLimitRequest } from '@server/error/global/limit.request.error';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimiterInterceptor implements NestInterceptor {
	private limiter: RateLimiterMemory;

	constructor() {
		this.limiter = new RateLimiterMemory({
			keyPrefix: 'rate-limiter',
			points: 5, // Número máximo de solicitudes permitidas en el intervalo
			duration: 1, // Intervalo de tiempo en segundos
		});
	}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<any> {
		const request = context.switchToHttp().getRequest();

		try {
			await this.limiter.consume(request.ip); // Utiliza la dirección IP del cliente como clave de limitación
			return next.handle();
		} catch (rateLimiterRes) {
			throw new ErrorLimitRequest();
		}
	}
}
