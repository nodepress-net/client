import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUserNotExist extends HttpException {
	constructor() {
		super('El usuario no existe', HttpStatus.BAD_REQUEST);
	}
}
