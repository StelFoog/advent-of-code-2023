import { input } from '../src/inputManager';

const rows = input.split('\n');

type Symbol = { x: number; y: number; char: string; numbers: number[] };
const symbols: Symbol[] = [];
rows.forEach((row, y) => {
	row.split('').forEach((char, x) => {
		if (char !== '.' && !char.match(/\d/)) symbols.push({ x, y, char, numbers: [] });
	});
});

rows.forEach((row, rowIdx) => {
	let number = '';
	let isValid: Symbol[] = [];
	for (let i = 0; i < row.length; i++) {
		const char = row.charAt(i);
		if (char.match(/\d/)) {
			number += char;
			const nearSymbol = hasSymbolNear(i, rowIdx);
			if (
				nearSymbol &&
				!isValid.some((symbol) => symbol.x === nearSymbol.x && symbol.y === nearSymbol.y)
			)
				isValid.push(nearSymbol);
		} else if (number !== '') {
			if (isValid.length) {
				isValid.forEach((symbol) => {
					symbol.numbers.push(Number(number));
				});
			}
			number = '';
			isValid = [];
		}
	}
	if (number !== '' && isValid.length) {
		isValid.forEach((symbol) => {
			symbol.numbers.push(Number(number));
		});
	}
});

let sum = 0;
symbols.forEach(({ char, numbers }) => {
	if (char === '*' && numbers.length === 2) sum += numbers[0] * numbers[1];
});
console.log(sum);

function hasSymbolNear(x: number, y: number) {
	for (const symbol of symbols) {
		if (Math.abs(symbol.x - x) <= 1 && Math.abs(symbol.y - y) <= 1) return symbol;
	}
	return null;
}
