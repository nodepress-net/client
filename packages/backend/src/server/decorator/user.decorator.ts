// ====================================
// Este decorador se encarga de obtener
// los datos del usuario a través del
// token almacenado en la cookie.
// ====================================

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HashService } from '@shared/module/hash/hash.service';
import { TokenService } from '@shared/module/token/token.service';

export const User = createParamDecorator(
	(output: unknown, context: ExecutionContext) => {
		const token = new TokenService();
		const hash = new HashService();
		const request = context.switchToHttp().getRequest();
		const { _sk } = request.cookies;

		const data = token.get<any>(_sk);

		if (!data) return null;

		return {
			id: hash.decode(data.id),
			decorator: 'User',
		};
	},
);
