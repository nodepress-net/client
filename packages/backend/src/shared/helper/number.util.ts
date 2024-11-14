export function calculatePercentage(
	oldNumber: number,
	newNumber: number,
): number {
	const difference = newNumber - oldNumber;
	const percentageChange = (difference / oldNumber) * 100;
	return percentageChange;
}

export function randomRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertToNumber(
	texts: string = '',
	maxSize: number = 5,
): string {
	const validCharacters = 'abcdefghijklmnñopqrstuvwxyzáéíóúü';
	const numeros = [];

	for (const text of texts) {
		const index = validCharacters.indexOf(text.toLowerCase());
		if (index === -1) {
			continue;
		}

		const numero = (index % 10) + 1;
		numeros.push(numero);
	}

	return numeros.join('').substring(0, maxSize);
}
