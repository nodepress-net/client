import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorLimitRequest extends HttpException {
	constructor() {
		super('Demasiada solicitudes', HttpStatus.BAD_REQUEST);
	}
}
