import { Injectable } from '@nestjs/common';
import { convertMonthToSeconds } from '@shared/helper/format.util';
import { CookieSerializeOptions, ReplayCookie } from '../domain/cookie.type';

@Injectable()
export class CookieController {
	private reply: ReplayCookie;
	private options: any;

	constructor() {
		this.options = this.defaultOptions();
	}

	private defaultOptions(): CookieSerializeOptions {
		const cookieOptions: CookieSerializeOptions = {
			secure: true, // Cambia a true si estás usando HTTPS
			httpOnly: true, // La cookie solo es accesible desde el servidor
			path: '/', // La ruta a la que se aplicará la cookie
			sameSite: 'none', // Controla la restricción de Same-Site (puede ser 'strict', 'lax', o 'none')
			signed: false, // Si quieres que la cookie esté firmada, cambia a true
			priority: 'high',
		};

		return cookieOptions;
	}

	setReply(reply: ReplayCookie): void {
		this.reply = reply;
	}

	setOptions(options: CookieSerializeOptions): void {
		if (options.maxAge)
			options.maxAge = convertMonthToSeconds(options.maxAge);

		this.options = Object.assign(this.options, options);
	}

	setData(key: string, value: string): void {
		if (!this.isUserConsentCookies()) return;

		this.reply.setCookie(key, value, this.options);
	}

	removeData(key: string): void {
		if (!this.isUserConsentCookies()) return;

		this.reply.clearCookie(key, this.options);
	}

	isUserConsentCookies(): boolean {
		return this.reply.cookies?.consentCookies === 'true';
	}
}
