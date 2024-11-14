import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
	create(
		payload: string | jwt.Jwt | Record<string, unknown>,
		options: jwt.SignOptions = {},
	): string {
		return jwt.sign(payload, process.env.SECRET_JWT, options);
	}

	get<T>(token: string): T {
		return jwt.verify(token, process.env.SECRET_JWT) as T;
	}

	decode(token: string): jwt.Jwt {
		return jwt.decode(token, { complete: true });
	}

	refresh(token: string): string {
		const payload = this.decode(token);
		return this.create(payload);
	}

	verify(token: string): boolean {
		try {
			jwt.verify(token, process.env.SECRET_JWT);
			return true;
		} catch (error) {
			return false;
		}
	}
}
