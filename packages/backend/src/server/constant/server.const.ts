// ====================================
// Este constante se encarga de almacenar
// la información por defecto del servidor.
// ====================================

import { VersioningType } from '@nestjs/common';
import { STATUS } from './status.http.const';

const OPTIONS = {
	snapshot: true,
};

const CORS = {
	origin: ['http://localhost:3000', 'http://localhost:5173'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: STATUS.NO_CONTENT,
	credentials: true,
};

const OPTIONS_CACHE = {
	isGlobal: true,
};

const OPTIONS_SESSION = {
	secret: process.env.OPTIONS_SESSION_SECRET,
	salt: process.env.OPTIONS_SESSION_SALT,
	sessionName: 'session',
	cookieName: 'speackme',
	sameSite: 'none',
	domain: process.env.HOST_COOKIE,
	cookie: {
		path: '/',
		// options for setCookie, see https://github.com/fastify/fastify-cookie
	},
};

const OPTIONS_VERSING: any = {
	type: VersioningType.URI,
	prefix: 'api/v',
};

const OPTIONS_TOOLS = {
	http: process.env.NODE_ENV !== 'production',
};

const OPTIONS_WEBSOCKET = {
	cors: {
		origin: '*',
	},
};

const VERSION_API = '1';

export const SERVER = {
	OPTIONS,
	CORS,
	OPTIONS_CACHE,
	OPTIONS_SESSION,
	OPTIONS_VERSING,
	OPTIONS_TOOLS,
	OPTIONS_WEBSOCKET,
	VERSION_API,
};
