import { error } from '@shared/helper/errorMessage';
import { parseTrim } from '@shared/helper/parseTrim';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

// expresion regular para validar password
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
const LETTER_REGEX = /^[a-zA-Z\s]{3,}$/;

export class AdminDto {
	@IsNotEmpty(error.NAME_INVALID)
	@Matches(LETTER_REGEX, error.NAME_INVALID)
	@Transform(parseTrim())
	name: string;

	@IsNotEmpty(error.LASTNAME_INVALID)
	@Matches(LETTER_REGEX, error.NAME_INVALID)
	@Transform(parseTrim())
	lastname: string;

	@IsNotEmpty(error.EMAIL_INVALID)
	@IsEmail({}, error.EMAIL_INVALID)
	@Transform(parseTrim())
	email: string;

	@IsNotEmpty(error.PASSWORD_INVALID)
	@Matches(PASSWORD_REGEX, error.PASSWORD_INVALID)
	@Transform(parseTrim())
	password: string;

	// Opcionar attribute: comercial
	@IsOptional()
	comercial: string;
}

export class AdminLoginDto {
	@IsNotEmpty(error.EMAIL_INVALID)
	@IsEmail({}, error.EMAIL_INVALID)
	@Transform(parseTrim())
	email: string;

	@IsNotEmpty(error.PASSWORD_INVALID)
	@Transform(parseTrim())
	password: string;
}
