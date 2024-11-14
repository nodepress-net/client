import { ConflictException } from '@nestjs/common';

export async function tryCatchThrow<T>(promise: Promise<T>): Promise<T> {
	try {
		const data = await promise;
		return data;
	} catch (error) {
		console.error(error);
		throw new ConflictException();
	}
}
