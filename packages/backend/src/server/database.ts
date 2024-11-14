import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DataSource } from 'typeorm';

export async function setupDatabase(app: NestFastifyApplication) {
	const dataSource = app.get(DataSource); // Obtiene la conexión a la base de datos
	if (!dataSource.isInitialized) {
		try {
			await dataSource.initialize(); // Intenta inicializar la conexión
			console.log('Database connected successfully.');
		} catch (err) {
			console.error('Error during database initialization:', err);
			// Manejo de errores en la inicialización de la base de datos
		}
	} else {
		console.log('Database is already initialized.');
	}
}
