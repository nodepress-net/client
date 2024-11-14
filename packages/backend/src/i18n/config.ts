import { AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';

export const i18nConfig = {
	fallbackLanguage: 'en',
	loaderOptions: {
		path: path.join(__dirname, '/'),
		watch: true,
	},
	resolvers: [
		{ use: AcceptLanguageResolver, options: ['accept-language'] }, // Resolver basado en la cabecera Accept-Language
	],
};
