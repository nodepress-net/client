import { CookieController } from '../infrastructure/cookie.controller';

export class CookieService {
	constructor(private readonly cookie: CookieController) {}

	setData(key: string, value: string): void {
		this.cookie.setData(key, value);
	}

	removeData(key: string): void {
		this.cookie.removeData(key);
	}

	setReply(reply: any): void {
		this.cookie.setReply(reply);
	}

	setOptions(options: any): void {
		this.cookie.setOptions(options);
	}
}
