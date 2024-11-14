import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
	private readonly key = Buffer.from(process.env.CRYPTO_KEY);
	private readonly algorithm = process.env.CRYPTO_ALGORITHM;
	private readonly encode = 'hex';
	private readonly iv: Buffer;

	constructor() {
		this.iv = Buffer.from(process.env.CRYPTO_IV);
	}

	encrypt(text: string): string {
		const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString(this.encode);
	}

	decrypt(text: string): string {
		const encryptedText = Buffer.from(text, this.encode);
		const decipher = crypto.createDecipheriv(
			this.algorithm,
			this.key,
			this.iv,
		);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}
}
