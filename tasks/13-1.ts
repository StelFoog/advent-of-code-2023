import { input } from '../src/inputManager';

let sum = 0;
input.split('\n\n').forEach((pattern) => {
	const rows = pattern.split('\n');

	// Vertical reflection
	for (let i = 1; i < rows[0].length; i++) {
		if (doesReflectVertical(rows, i)) {
			sum += i;
		}
	}
	// Horizontal reflection
	for (let i = 1; i < rows.length; i++) {
		if (doesReflectHorizontal(rows, i)) {
			sum += i * 100;
		}
	}
});
console.log(sum);

function doesReflectVertical(rows: string[], from: number) {
	let i = 0;
	for (; i + from < rows[0].length; i++) {
		let opposite = from - i - 1;
		if (opposite < 0) break;
		if (!rows.every((row) => row[opposite] === row[i + from])) return 0;
	}

	return i;
}

function doesReflectHorizontal(rows: string[], from: number) {
	let i = 0;
	for (; i + from < rows.length; i++) {
		const opposite = from - i - 1;
		if (opposite < 0) break;
		if (rows[i + from] !== rows[opposite]) return 0;
	}

	return i;
}
