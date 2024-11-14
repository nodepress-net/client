import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorFileType extends HttpException {
	constructor() {
		super('El tipo de archivo no es válido', HttpStatus.BAD_REQUEST);
	}
}
