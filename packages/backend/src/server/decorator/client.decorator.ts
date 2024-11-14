// ====================================
// Este decorador se encarga de obtener
// los datos del cliente.
// ====================================

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as DeviceDetector from 'device-detector-js';

function randomNumer() {
	return Math.floor(Math.random() * 255);
}

function randomIp() {
	return `${randomNumer()}.${randomNumer()}.${randomNumer()}.${randomNumer()}`;
}

function getIp(ip: string) {
	const localIps = ['::1', '127.0.0.1', '::ffff:', '::ffff:127.0.0.1'];
	if (localIps.includes(ip)) return randomIp();
	return ip;
}

function getDevice(userAgent: string) {
	const deviceDetector = new DeviceDetector();
	return deviceDetector.parse(userAgent);
}

function getLanguageByHeader(header: string) {
	const DEFAULT_LANGUAGE = 'en';
	if (!header) return DEFAULT_LANGUAGE;
	const languages = header.split(',');
	return languages[0].split(';')[0] || DEFAULT_LANGUAGE;
}

export type ClientProps = {
	ip: string;
	device: any;
	location: any;
	language: string;
};

export const Client = createParamDecorator(
	(data: unknown, context: ExecutionContext): ClientProps => {
		const request = context.switchToHttp().getRequest();
		const ip = getIp(
			request.headers['x-real-ip'] ||
				request.ip ||
				request.headers['x-forwarded-for'] ||
				request.connection.remoteAddress,
		);

		const device = getDevice(request.headers['user-agent']);

		const language = getLanguageByHeader(
			request.headers['accept-language'],
		);

		return {
			ip,
			device,
			location,
			language,
		};
	},
);
