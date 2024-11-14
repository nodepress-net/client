import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

// create custom error

export function handleDatabaseError(error: any) {
	if (error instanceof QueryFailedError) {
		if (error.message.includes('SQLITE_CONSTRAINT')) {
			const fieldMatch = error.message.match(
				/NOT NULL constraint failed: (\w+\.\w+)/,
			);
			const fieldName = fieldMatch ? fieldMatch[1].split('.')[1] : null;

			const errorMessage = fieldName
				? `The field '${fieldName}' is required and cannot be null.`
				: 'Database constraint error: check required fields and constraints';

			throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

	// Manejo de errores de propiedades no encontradas en la entidad
	if (error instanceof EntityPropertyNotFoundError) {
		//const errorMessage = `The property '${error.propertyPath}' was not found in the entity '${error.entityMetadata.targetName}'. Please check your query and entity definitions.`;
		const errorMessage =
			'The property was not found in the entity. Please check your query and entity definitions.';

		throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
	}

	if (error instanceof HttpException) {
		throw error;
	}

	// Lanza un error genérico si no se trata de una restricción específica
	throw new HttpException(
		'Internal server error',
		HttpStatus.INTERNAL_SERVER_ERROR,
	);
}
