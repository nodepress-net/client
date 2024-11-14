import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorPassword extends HttpException {
	constructor() {
		super('La contraseña no es válida', HttpStatus.BAD_REQUEST);
	}
}
