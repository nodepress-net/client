import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorDate extends HttpException {
	constructor() {
		super('La fecha no es válida', HttpStatus.BAD_REQUEST);
	}
}
