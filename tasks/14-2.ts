import { input } from '../src/inputManager';

const TOTAL_CYCLES = 1_000_000_000;

const northCache: Record<string, string[]> = {};
const westCache: Record<string, string[]> = {};
const southCache: Record<string, string[]> = {};
const eastCache: Record<string, string[]> = {};
const cycleCache: Record<string, { rows: string[]; occuredAt: number }> = {};

let rows = input.split('\n');

for (let i = 0; i < TOTAL_CYCLES; i++) {
	const key = rows.join('');
	if (cycleCache[key] !== undefined) {
		const cyclesBetween = i - cycleCache[key].occuredAt;
		for (let j = i; j < TOTAL_CYCLES; j += cyclesBetween) {
			i = j;
		}
		rows = cycleCache[key].rows.map((row) => row);
		continue;
	}
	rollNorth();
	rollWest();
	rollSouth();
	rollEast();

	cycleCache[key] = { rows: rows.map((row) => row), occuredAt: i };
}

let sum = 0;
rows.forEach((row, index) => {
	for (let i = 0; i < row.length; i++) {
		if (row[i] === 'O') sum += rows.length - index;
	}
});
console.log(sum);

function rollNorth() {
	const cacheKey = rows.join('');
	if (northCache[cacheKey] !== undefined) return (rows = northCache[cacheKey].map((row) => row));

	for (let i = 1; i < rows.length; i++) {
		for (let j = i; j >= 1; j--) {
			for (let x = 0; x < rows[j].length; x++) {
				if (rows[j - 1][x] !== '.' || rows[j][x] !== 'O') continue;
				const above = rows[j - 1];
				rows[j - 1] = above.slice(0, x) + 'O' + above.slice(x + 1);
				const curr = rows[j];
				rows[j] = curr.slice(0, x) + '.' + curr.slice(x + 1);
			}
		}
	}
	northCache[cacheKey] = rows.map((row) => row);
}

function rollWest() {
	const cacheKey = rows.join('');
	if (westCache[cacheKey] !== undefined) return (rows = westCache[cacheKey].map((row) => row));

	for (let i = 1; i < rows[0].length; i++) {
		for (let j = i; j >= 1; j--) {
			for (let y = 0; y < rows.length; y++) {
				if (rows[y][j - 1] !== '.' || rows[y][j] !== 'O') continue;
				rows[y] = rows[y].slice(0, j - 1) + 'O.' + rows[y].slice(j + 1);
			}
		}
	}
	westCache[cacheKey] = rows.map((row) => row);
}

function rollSouth() {
	const cacheKey = rows.join('');
	if (southCache[cacheKey] !== undefined) return (rows = southCache[cacheKey].map((row) => row));

	for (let i = rows.length - 2; i >= 0; i--) {
		for (let j = i; j <= rows.length - 2; j++) {
			for (let x = 0; x < rows[j].length; x++) {
				if (rows[j + 1][x] !== '.' || rows[j][x] !== 'O') continue;
				const below = rows[j + 1];
				rows[j + 1] = below.slice(0, x) + 'O' + below.slice(x + 1);
				const curr = rows[j];
				rows[j] = curr.slice(0, x) + '.' + curr.slice(x + 1);
			}
		}
	}
	southCache[cacheKey] = rows.map((row) => row);
}

function rollEast() {
	const cacheKey = rows.join('');
	if (eastCache[cacheKey] !== undefined) return (rows = eastCache[cacheKey].map((row) => row));

	for (let i = rows[0].length - 2; i >= 0; i--) {
		for (let j = i; j <= rows[0].length - 2; j++) {
			for (let y = 0; y < rows.length; y++) {
				if (rows[y][j + 1] !== '.' || rows[y][j] !== 'O') continue;
				rows[y] = rows[y].slice(0, j) + '.O' + rows[y].slice(j + 2);
			}
		}
	}
	eastCache[cacheKey] = rows.map((row) => row);
}
