import { input } from '../src/inputManager';

let sum = 0;
input.split('\n\n').forEach((pattern) => {
	const rows = pattern.split('\n');

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			const unsmudgedRows = rows.map((row, index) => {
				if (index !== y) return row;
				const unsmudgedChar = row[x] === '.' ? '#' : '.';
				return row.slice(0, x) + unsmudgedChar + row.slice(x + 1);
			});
			// Vertical reflection
			for (let i = 1; i < unsmudgedRows[0].length; i++) {
				if (doesReflectVertical(unsmudgedRows, i) && !doesReflectVertical(rows, i)) {
					sum += i;
					return;
				}
			}
			// Horizontal reflection
			for (let i = 1; i < unsmudgedRows.length; i++) {
				if (doesReflectHorizontal(unsmudgedRows, i) && !doesReflectHorizontal(rows, i)) {
					sum += i * 100;
					return;
				}
			}
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
