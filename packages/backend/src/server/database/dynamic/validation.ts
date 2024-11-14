import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validateDataSchema } from './validation/validate';

@Injectable()
export class DynamicValidationPipe implements PipeTransform {
	constructor(private readonly entity: any) {} // Recibe el DTO dinámico

	async transform(value: any) {
		const errors = validateDataSchema(value, this.entity);
		if (errors.length > 0) {
			throw new BadRequestException({
				message: 'Validation failed',
				errors,
			});
		}
		return value;
	}
}
