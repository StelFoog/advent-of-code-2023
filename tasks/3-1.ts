import { input } from '../src/inputManager';

let sum = 0;

const rows = input.split('\n');

type Symbol = { x: number; y: number };
const symbols: Symbol[] = [];
rows.forEach((row, y) => {
	row.split('').forEach((char, x) => {
		if (char !== '.' && !char.match(/\d/)) symbols.push({ x, y });
	});
});

rows.forEach((row, rowIdx) => {
	let number = '';
	let isValid = false;
	for (let i = 0; i < row.length; i++) {
		const char = row.charAt(i);
		if (char.match(/\d/)) {
			number += char;
			if (hasSymbolNear(i, rowIdx)) isValid = true;
		} else if (number !== '') {
			if (isValid) {
				sum += Number(number);
			}
			number = '';
			isValid = false;
		}
	}
	if (number !== '' && isValid) {
		sum += Number(number);
	}
});
console.log(sum);

function hasSymbolNear(x: number, y: number) {
	for (const symbol of symbols) {
		if (Math.abs(symbol.x - x) <= 1 && Math.abs(symbol.y - y) <= 1) return symbol;
	}
	return null;
}
