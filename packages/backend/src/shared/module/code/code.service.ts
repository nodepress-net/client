// ====================================
// Este modulo se encarga de generar códigos.
// ====================================

import { Injectable } from '@nestjs/common';

@Injectable()
export class Code {
	generator(size: number): string {
		const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < size; i++) {
			result += charset[Math.floor(Math.random() * charset.length)];
		}
		return result;
	}
}
