import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SERVER } from '@server/constant/server.const';
import { AppModule } from '../app.module';

export async function createServer(): Promise<NestFastifyApplication> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		SERVER.OPTIONS,
	);

	return app;
}
