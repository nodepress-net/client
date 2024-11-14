import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorFileSize extends HttpException {
	constructor() {
		super('El tamaño del archivo no es válido', HttpStatus.BAD_REQUEST);
	}
}
