// ====================================
// Este es un Pipe que se encarga de limitar
// el valor de un número a un rango específico.
// Para el buscador de datos.
// ====================================

import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LimitPipe implements PipeTransform {
	private readonly MAX_LIMIT = 100;
	private readonly MIN_LIMIT = 10;

	transform(value: any) {
		value = parseInt(value, 10) || 0;
		return Math.min(Math.max(value, this.MIN_LIMIT), this.MAX_LIMIT);
	}
}
