import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import * as multipart from '@fastify/multipart';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SERVER } from '@server/constant/server.const';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { QueryParserMiddleware } from './middleware/filter.middleware';

export async function setupMiddleware(app: NestFastifyApplication) {
	await app.register(helmet);
	await app.register(fastifyCsrf);
	await app.register(multipart);

	app.enableCors(SERVER.CORS);
	app.enableVersioning(SERVER.OPTIONS_VERSING);
	app.use(new QueryParserMiddleware().use);

	app.useGlobalPipes(new I18nValidationPipe({ whitelist: true }));
	app.useGlobalFilters(new I18nValidationExceptionFilter());
}
