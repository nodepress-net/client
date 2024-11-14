import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
//import qs from 'qs';

@Injectable()
export class QueryParserMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		next();
	}
}
