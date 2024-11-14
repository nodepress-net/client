// Exclude keys from user
export function exclude<T>(user: T, keys: string[]): any {
	return Object.fromEntries(
		Object.entries(user).filter(([key]) => !keys.includes(key)),
	);
}
