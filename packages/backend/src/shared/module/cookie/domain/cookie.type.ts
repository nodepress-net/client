import { FastifyReply, FastifyRequest } from 'fastify';

export interface CookieSerializeOptions {
	/**  The `Domain` attribute. */
	domain?: string;
	encode?(val: string): string;
	/**  The expiration `date` used for the `Expires` attribute. If both `expires` and `maxAge` are set, then `expires` is used. */
	expires?: Date;
	/**  The `boolean` value of the `HttpOnly` attribute. Defaults to true. */
	httpOnly?: boolean;
	/**  A `number` in milliseconds that specifies the `Expires` attribute by adding the specified milliseconds to the current date. If both `expires` and `maxAge` are set, then `expires` is used. */
	maxAge?: number;
	/**  The `Path` attribute. Defaults to `/` (the root path).  */
	path?: string;
	priority?: 'low' | 'medium' | 'high';
	/** A `boolean` or one of the `SameSite` string attributes. E.g.: `lax`, `node` or `strict`.  */
	sameSite?: 'lax' | 'none' | 'strict' | boolean;
	/**  The `boolean` value of the `Secure` attribute. Set this option to false when communicating over an unencrypted (HTTP) connection. Value can be set to `auto`; in this case the `Secure` attribute will be set to false for HTTP request, in case of HTTPS it will be set to true.  Defaults to true. */
	secure?: boolean | 'auto';
	signed?: boolean;
}

export type ReplayCookie = FastifyReply & {
	cookie(name: string, value: string, options?: CookieSerializeOptions): void;
	clearCookie(name: string, options?: CookieSerializeOptions): void;
	cookies: Record<string, string>;
	setCookie(
		name: string,
		value: string,
		options?: CookieSerializeOptions,
	): void;
};

export type RequestCookies = FastifyRequest & {
	cookies: Record<string, string>;
};
