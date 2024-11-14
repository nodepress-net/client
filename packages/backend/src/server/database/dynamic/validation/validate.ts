import { EntitySchema } from 'typeorm';

type ErrorReponse = { message: string; key: string };

// Validar datos que me entran, en caso de no serlo, lanzar un error
export function validateDataSchema(
	data: Record<string, any>,
	schema: EntitySchema<any>,
): ErrorReponse[] {
	const errors: ErrorReponse[] = [];
	const schemaColumns = schema.options.columns || {};

	// Ignorar propiedades autogeneradas o de control de tiempo
	const ignoredProperties = ['id', 'created', 'updated'];

	for (const [key, column] of Object.entries(schemaColumns)) {
		if (ignoredProperties.includes(key)) {
			continue;
		}

		const value = data[key];

		// Validar la existencia de la propiedad requerida
		if (!value && !column.nullable && !column.default) {
			errors.push({
				message: `La propiedad '${key}' es requerida.`,
				key,
			});
			continue;
		}

		// Validar tipos básicos de datos
		// Validar tipos de datos TypeORM en columnas
		if (value !== null && value !== undefined) {
			const expectedType = column.type as string;
			if (!isValidType(value, expectedType)) {
				errors.push({
					message: `La propiedad '${key}' debe ser de tipo '${expectedType}', pero se encontró '${typeof value}'.`,
					key,
				});
			}
		}
	}

	// Validar que no haya propiedades adicionales
	for (const key of Object.keys(data)) {
		if (!schemaColumns[key]) {
			errors.push({
				message: `La propiedad '${key}' no está definida en el esquema.`,
				key,
			});
		}
	}

	return errors;
}

// Función para validar tipos específicos de TypeORM
function isValidType(value: any, expectedType: string): boolean {
	switch (expectedType) {
		case 'int':
		case 'integer':
		case 'bigint':
			return typeof value === 'number' && Number.isInteger(value);
		case 'float':
		case 'double':
		case 'decimal':
			return typeof value === 'number' || !isNaN(parseFloat(value));
		case 'varchar':
		case 'text':
			return typeof value === 'string';
		case 'boolean':
			return (
				typeof value === 'boolean' ||
				value === 'true' ||
				value === 'false'
			);
		case 'datetime':
		case 'timestamp':
			return value instanceof Date || !isNaN(Date.parse(value));
		case 'date':
			return (
				typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
			);
		case 'time':
			return (
				typeof value === 'string' &&
				/^\d{2}:\d{2}(:\d{2})?$/.test(value)
			);
		case 'json':
		case 'simple-json':
			try {
				JSON.parse(value);
				return true;
			} catch {
				return false;
			}
		case 'uuid':
			const uuidRegex =
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
			return typeof value === 'string' && uuidRegex.test(value);
		case 'simple-array':
			return Array.isArray(value);
		default:
			return typeof value === expectedType;
	}
}
