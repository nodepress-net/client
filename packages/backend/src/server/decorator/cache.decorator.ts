// ====================================
// Este decorador se encarga de cachear
// los resultados de las funciones.
// ====================================

import { CacheService } from '@shared/module/cache.database';

export function Cache(key: string, duration?: string | number) {
	return (
		target: any,
		propertyKey: string,
		propertyDescriptor: PropertyDescriptor,
	) => {
		const originalMethod = propertyDescriptor.value;
		const cacheManager = new CacheService();

		propertyDescriptor.value = async function (...args: any[]) {
			if (args.length) {
				const arg = args[0];
				key = `${key}:${arg}`;
			}

			const cache = await cacheManager.get(key);

			if (cache) return cache;

			const result = await originalMethod.apply(this, args);

			cacheManager.set(key, result, duration);

			return result;
		};

		return propertyDescriptor;
	};
}
