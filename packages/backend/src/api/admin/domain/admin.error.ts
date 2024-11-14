import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminExistError extends HttpException {
	constructor() {
		super('Usuario no permitido', HttpStatus.BAD_REQUEST);
	}
}

export class AdminError extends HttpException {
	constructor() {
		super('Usuario no permitido', HttpStatus.BAD_REQUEST);
	}
}
