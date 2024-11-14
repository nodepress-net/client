import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorYear extends HttpException {
	constructor(year: number) {
		super(`La edad mínima es de ${year} años`, HttpStatus.BAD_REQUEST);
	}
}
