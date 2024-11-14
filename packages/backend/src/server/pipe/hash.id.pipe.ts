// ====================================
// Este es un Pipe que se encarga de
// decodificar un ID encriptado.
// ====================================

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { HashService } from '@shared/module/hash/hash.service';

@Injectable()
export class HashIdPipe implements PipeTransform {
	private readonly hashId: any;
	constructor() {
		this.hashId = new HashService();
	}

	transform(value: any) {
		if (value.length >= this.hashId.pad) {
			return this.hashId.decode(value);
		}

		return new BadRequestException('Invalid ID');
	}
}
