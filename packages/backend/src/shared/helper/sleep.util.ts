export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sleepRandom(min: number, max: number): Promise<void> {
	const ms = Math.floor(Math.random() * (max - min + 1) + min);
	return new Promise((resolve) => setTimeout(resolve, ms));
}
