import { applyDecorators, UsePipes } from '@nestjs/common';
import { DynamicValidationPipe } from './validation';

export function DynamicValidation(dto: any) {
	return applyDecorators(UsePipes(new DynamicValidationPipe(dto)));
}
