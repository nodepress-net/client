// ====================================
// Este guardia se encarga de validar
// los roles de los usuarios.
// ====================================

/* import { AuthTokenUser } from '@api/auth/domain/auth.type';
import { RequestCookies } from '@module/cookie/domain/cookie.type';
import { SCOPE } from '@module/scope/scope.type';
import { TokenService } from '@module/token/token.service';
import {
	ExecutionContext,
	SetMetadata,
	createParamDecorator,
} from '@nestjs/common';

export const UserDeleteGuard = () =>
	SetMetadata('userAllowDeleteScopes', SCOPE.USER_DELETE);

export const GetUser = createParamDecorator(
	(data: string, context: ExecutionContext) => {
		const request: RequestCookies = context.switchToHttp().getRequest();
		const { _sk } = request.cookies;
		const token = new TokenService();

		if (!_sk) return null;

		const tokenData = token.get<AuthTokenUser>(_sk);

		if (!tokenData) return null;

		const { scope } = tokenData;

		return scope.includes(data);
	},
);
 */
