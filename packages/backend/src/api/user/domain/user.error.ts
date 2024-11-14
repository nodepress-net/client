import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDataError extends HttpException {
	constructor() {
		super('Datos incorrectos', HttpStatus.BAD_REQUEST);
	}
}

export class UserSlugError extends HttpException {
	constructor() {
		super('Slug no valido', HttpStatus.BAD_REQUEST);
	}
}

export class UserEmailError extends HttpException {
	constructor() {
		super('Email no valido', HttpStatus.BAD_REQUEST);
	}
}
