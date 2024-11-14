import { setupDatabase } from '@server/database';
import { setupMiddleware } from '@server/middleware';
import { setupSwagger } from '@server/swagger';

import { createServer } from './server';

async function bootstrap() {
	const env = process.env;

	const app = await createServer();

	await setupMiddleware(app);
	await setupDatabase(app);

	setupSwagger(app);

	await app.listen({
		port: parseInt(env.PORT_HTTP),
		host: env.IP_HTTP,
	});

	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
