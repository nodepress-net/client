import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomModule } from './dynamic/custom.module';

@Module({
	imports: [
		ConfigModule.forRoot(), // Importa configuración desde variables de entorno
		CustomModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const dbType = configService.get<string>('DB_TYPE');

				// Carga las entidades estáticas y dinámicas
				const staticEntities = [
					__dirname + '/entities/**/*.entity{.ts,.js}',
				];
				const dynamicEntities = (
					await import('./dynamic/custom.module')
				).generateEntities();

				const entities = [...staticEntities, ...dynamicEntities]; // Combina las entidades estáticas y dinámicas

				// Configura la base de datos en función del tipo de base de datos de la variable de entorno
				if (dbType === 'sqlite') {
					const getNameFile = () => {
						const isNotExistName =
							configService.get<string>('DB_NAME') === undefined;

						if (isNotExistName) {
							return 'database.sqlite';
						}

						const name = configService.get<string>('DB_NAME');

						if (name.includes('.sqlite')) {
							return name;
						}

						return name + '.sqlite';
					};

					return {
						type: 'sqlite',
						database: getNameFile(),
						entities,
						synchronize: true,
					};
				} else if (dbType === 'mysql') {
					return {
						type: 'mysql',
						host: configService.get<string>('DB_HOST'),
						port: configService.get<number>('DB_PORT'),
						username: configService.get<string>('DB_USERNAME'),
						password: configService.get<string>('DB_PASSWORD'),
						database: configService.get<string>('DB_NAME'),
						entities,
						synchronize: true,
					};
				} else if (dbType === 'postgres') {
					return {
						type: 'postgres',
						host: configService.get<string>('DB_HOST'),
						port: configService.get<number>('DB_PORT'),
						username: configService.get<string>('DB_USERNAME'),
						password: configService.get<string>('DB_PASSWORD'),
						database: configService.get<string>('DB_NAME'),
						entities,
						synchronize: true,
					};
				}
			},
		}),
	],
})
export class DatabaseModule {}
