import { Injectable } from '@nestjs/common';
import { convertToMiliseconds } from '@shared/helper/format.util';
import { MemoryCache, caching } from 'cache-manager';

@Injectable()
export class CacheService {
	private cache: Promise<MemoryCache> | null = null;

	constructor() {
		const option: any = {
			store: 'custom',
			ttl: convertToMiliseconds(parseInt(process.env.CACHE_MAX_TIME)), // duración predeterminada del caché en segundos (1 hora)
		};

		this.cache = caching('memory', option);
	}

	async set(key: string, value: any, duration?: string | number) {
		const store = await this.cache;

		const ttl = convertToMiliseconds(
			!duration ? parseInt(process.env.CACHE_MAX_TIME) : duration,
		);

		await store.set(key, value, ttl);
	}

	async get<T>(key: string) {
		const store = await this.cache;
		return (await store.get(key)) as T;
	}

	async del(key: string) {
		const store = await this.cache;
		await store.del(key);
	}

	async reset() {
		const store = await this.cache;
		await store.reset();
	}
}
