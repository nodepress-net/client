import { i18nValidationMessage } from 'nestjs-i18n';

export function errorDto(key: any) {
	return {
		message: i18nValidationMessage('validation.' + key),
	};
}

export const error = {
	NAME_INVALID: errorDto('NAME_INVALID'),
	LASTNAME_INVALID: errorDto('LASTNAME_INVALID'),
	EMAIL_INVALID: errorDto('EMAIL_INVALID'),
	PASSWORD_INVALID: errorDto('PASSWORD_INVALID'),
};
