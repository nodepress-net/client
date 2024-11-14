export function incrementDate(days: number, date: Date = new Date()): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
