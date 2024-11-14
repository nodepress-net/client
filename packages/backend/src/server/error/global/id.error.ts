import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorId extends HttpException {
	constructor() {
		super('Id invalidad', HttpStatus.BAD_REQUEST);
	}
}
