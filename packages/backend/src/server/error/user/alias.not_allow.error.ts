import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorAliasNotAllow extends HttpException {
	constructor() {
		super('Este alias no está permitido', HttpStatus.BAD_REQUEST);
	}
}
