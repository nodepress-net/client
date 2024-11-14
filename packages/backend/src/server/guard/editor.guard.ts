// ====================================
// Este guardia se encarga de validar
// los roles de los usuarios.
// ====================================

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class EditorGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const allowedHost = 'https://manager.speack.me'; // Reemplaza esto con tu host permitido

		// Verificar el host
		if (request.headers.host !== allowedHost) {
			return false;
		}

		// Verificar el tipo de usuario a través del token en la cookie
		/* const userType = this.getUserTypeFromToken(request.cookies['tu_nombre_de_cookie']);
		if (!userType) {
		  return false;
		} */

		// Puedes usar el reflector para guardar el tipo de usuario en el contexto si lo necesitas en otros lugares
		//this.reflector.set('userType', userType, context.getHandler());

		return true;
	}
}
