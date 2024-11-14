import {
	Body,
	Controller,
	Delete,
	DynamicModule,
	Get,
	HttpException,
	HttpStatus,
	Module,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Api } from '@server/pipe/api.version.pipe';
import qs from 'qs';
import { EntitySchema, Like } from 'typeorm';
import { entities } from './entities';
import { handleDatabaseError } from './error.handler';

import { buildWhereClause } from './filters';
import { DynamicValidation } from './validation.decorator';

function pascalCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function validateEntityName(entityName: string): boolean {
	// Validar que el nombre de la entidad no sea uno de los reservados
	const reservedNames = [
		'node_admin',
		'node_admin_role',
		'node_folder_media',
		'node_i18n',
		'node_setting',
		'node_user',
		'node_user_permission',
		'node_user_role',
		'node_webhooks',
		'sqlite_sequence',
	];
	if (reservedNames.includes(entityName)) {
		console.error(
			`Error en la entidad "${entityName}": el nombre está reservado y no puede ser utilizado.`,
		);
		return false;
	}

	return true;
}

function validateColumnConfig(columnConfig: any, columnName: string): boolean {
	// Tipos válidos compatibles con SQLite, MySQL y PostgreSQL
	const validTypes = [
		'int', // Para enteros
		'integer', // Alias de 'int', compatible con SQLite
		'bigint', // Para enteros grandes
		'float', // Para números de punto flotante
		'double', // Mayor precisión en punto flotante
		'decimal', // Para decimales exactos
		'varchar', // Texto de longitud variable
		'text', // Texto largo
		'boolean', // Valores booleanos
		'datetime', // Fecha y hora
		'date', // Solo fecha
		'time', // Solo hora
		'timestamp', // Marca de tiempo completa
		'json', // Almacena datos JSON (en SQLite es compatible como texto)
		'uuid', // Identificadores únicos (UUID)
		'simple-array', // Almacena array como texto separado por comas
		'simple-json', // JSON simple almacenado como texto
	];

	// Validar que el tipo sea uno de los permitidos
	if (!columnConfig.type || !validTypes.includes(columnConfig.type)) {
		console.error(
			`Error en la columna "${columnName}": tipo inválido "${columnConfig.type}".`,
		);
		return false;
	}

	// Validar que si se proporciona un valor predeterminado, esté en el formato esperado
	if (
		columnConfig.default !== undefined &&
		typeof columnConfig.default !== 'function' &&
		!['string', 'number', 'boolean'].includes(typeof columnConfig.default)
	) {
		console.error(
			`Error en la columna "${columnName}": valor por defecto inválido "${columnConfig.default}".`,
		);
		return false;
	}

	// Validar que el nombre de la columna no sea uno de los reservados
	const reservedNames = ['id', 'createdAt', 'updatedAt'];
	if (reservedNames.includes(columnName)) {
		console.error(
			`Error en la columna "${columnName}": el nombre está reservado y no puede ser utilizado.`,
		);
		return false;
	}

	return true;
}

export function generateEntities(): EntityClassOrSchema[] {
	return entities.map((entityDef) => {
		const { name, options, columns } = entityDef;

		// Validar el nombre de la entidad
		if (!validateEntityName(name)) {
			return;
		}

		// Validar las columnas
		for (const columnName in columns) {
			if (!validateColumnConfig(columns[columnName], columnName)) {
				return;
			}
		}

		// Añadir los campos básicos
		const baseColumns = {
			id: {
				type: 'int',
				primary: true,
				generated: 'increment',
			},
			created: {
				type: 'datetime',
				createDate: true, // Usará el decorador CreateDateColumn
			},
			updated: {
				type: 'datetime',
				updateDate: true, // Usará el decorador UpdateDateColumn
			},
		};

		if (options?.draftAndPublish) {
			baseColumns.published = {
				type: 'boolean',
				default: false,
			};
		}

		// Combinar los campos base con los especificados en el archivo
		const finalColumns = {
			...baseColumns,
			...columns,
		};

		const entity = new EntitySchema({
			name,
			columns: finalColumns,
			options: {},
		});

		return entity;
	});
}

function generateCrudControllers(entities: any[]) {
	return entities.map((entity) => {
		const entityName = entity.options.name;

		@Controller(Api(`/${entityName}`)) // Convierte el nombre de la entidad a minúsculas
		class DynamicCrudController {
			constructor(
				@InjectRepository(entity)
				private readonly repository: typeof entity,
			) {}

			@Get()
			async findAll(
				@Query('page') page: number = 1,
				@Query('limit') limit: number = 10,
				@Query('search') search: string, // Parámetro de búsqueda global opcional
				@Query() query: any,
			) {
				const params = {
					skip: (page - 1) * limit,
					take: limit,
					where: {}, // Inicializamos la propiedad 'where' para filtros
				};

				const parseFilters = qs.parse(query);

				// Agregar filtros
				if (
					parseFilters?.filters &&
					Object.keys(parseFilters?.filters).length > 0
				) {
					const filters = buildWhereClause(
						parseFilters.filters as any,
						this.repository.metadata.columns,
					);

					//const parsedFilters = JSON.parse(filters);
					params.where = {
						...params.where,
						...filters,
					};
				}

				// Sort
				if (
					parseFilters?.sort &&
					Object.keys(parseFilters?.sort).length > 0
				) {
					params.order = parseFilters.sort;
				}

				// comprobar si tenemos la columna draftAndPublish
				if (entity.options.draftAndPublish) {
					params.where = {
						...params.where,
						published: true,
					};
				}

				// Agregar búsqueda global en campos específicos
				if (search) {
					// recupear los atributos de la entidad para buscar en ellos de tipo texto
					const columns = entity.options.columns;

					// create array of columns to search [ {attr:Like('%search%')},  ... ]
					const textColumns = Object.keys(columns)
						.filter((key) => columns[key].type === 'text')
						.map((key) => ({ [key]: Like(`%${search}%`) }));

					if (textColumns.length > 0) {
						params.where = [...textColumns];
					}

					// https://orkhan.gitbook.io/typeorm/docs/find-options
				}

				try {
					const data = await this.repository.find(params);
					const total = await this.repository.count(params);
					const totalPage = Math.ceil(total / limit);

					return {
						data, //data,
						metadata: {
							total, //total,
							page: parseInt(page as unknown as string), //page,
							totalPage,
						},
					};
				} catch (error) {
					handleDatabaseError(error);
				}
			}

			@Get(':id')
			async findOne(@Param('id') id: number): Promise<typeof entity> {
				try {
					await this.isIdExists(id);
					return await this.repository.findOneBy({ id });
				} catch (error) {
					handleDatabaseError(error);
				}
			}

			@Post()
			@DynamicValidation(entity) // Usa el decorador de validación dinámica
			async create(@Body() createDto: typeof entity) {
				console.log(createDto);
				try {
					return await this.repository.save(createDto);
				} catch (error) {
					handleDatabaseError(error);
				}
			}

			@Put(':id')
			async update(@Param('id') id: number, @Body() updateDto: any) {
				try {
					await this.isIdExists(id);
					return await this.repository.update(id, updateDto);
				} catch (error) {
					handleDatabaseError(error);
				}
			}

			@Delete(':id')
			async remove(@Param('id') id: number) {
				try {
					await this.isIdExists(id);
					await this.repository.delete(id);
					return { id };
				} catch (error) {
					handleDatabaseError(error);
				}
			}

			private async isIdExists(id: number) {
				const result = await this.repository.findOneBy({ id });
				if (!result) {
					throw new HttpException(
						`Entity with id ${id} not found`,
						HttpStatus.NOT_FOUND,
					);
				}
			}
		}

		// Cambiar el nombre de la clase en tiempo de ejecución
		Object.defineProperty(DynamicCrudController, 'name', {
			value: pascalCase(`${entity.options.name}Controller`),
		});

		return DynamicCrudController;
	});
}

@Module({})
export class CustomModule {
	static async forRoot(): Promise<DynamicModule> {
		const dynamicEntities = generateEntities();
		const dynamicControllers = generateCrudControllers(dynamicEntities);

		// Dinamic entity module to register entities typeorm
		const DynamicEntityModule = TypeOrmModule.forFeature(dynamicEntities);

		return {
			module: CustomModule,
			imports: [
				DynamicEntityModule, // Registra las entidades dinámicas
			],
			controllers: [...dynamicControllers], // Registra los controladores CRUD dinámicos
			exports: [DynamicEntityModule],
		};
	}
}
