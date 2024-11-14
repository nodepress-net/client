export function limitRangeNumber(
	limit: number,
	limitMin: number = 5,
	limitMax: number = 200,
): number {
	return Math.max(limitMin, Math.min(limit, limitMax));
}

export function limitNumber(inputNumber: number, limit: number): number {
	return inputNumber > limit ? limit : inputNumber;
}
