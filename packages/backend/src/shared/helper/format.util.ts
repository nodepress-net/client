export function convertToMiliseconds(time: string | number): number {
	let milliseconds = 0;

	if (typeof time === 'string') {
		const matches = time.match(/^(\d+)(h|m|s)$/);

		if (matches) {
			const [, value, unit] = matches;

			if (unit === 'h') {
				milliseconds = parseInt(value) * 60 * 60 * 1000;
			} else if (unit === 'm') {
				milliseconds = parseInt(value) * 60 * 1000;
			} else if (unit === 's') {
				milliseconds = parseInt(value) * 1000;
			}
		}
	} else if (typeof time === 'number') {
		milliseconds = time;
	}

	return milliseconds;
}

export function convertToSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '_');
}

export function convertMonthToSeconds(months: number): number {
	return months * 30 * 24 * 60 * 60;
}

export function formatDate(date: Date): string {
	if (date === null) return '---';
	return date.toISOString().split('T')[0];
}

export function formatDateTime(date: Date): string {
	if (date === null) return '---';
	const [data, time] = date.toISOString().split('T');
	return `${data} ${time.split('.')[0]}`;
}
