import { input } from '../src/inputManager';

type SpaceNode = '.' | '#';

let map = input.split('\n').map((row) => row.split('') as SpaceNode[]);

const extraRows: number[] = [];
const extraCols: number[] = [];
for (let i = 0; i < map.length; i++) {
	if (map[i].every((node) => node === '.')) extraRows.push(i);
}
for (let i = 0; i < map[0].length; i++) {
	if (map.every((row) => row[i] === '.')) extraCols.push(i);
}

let totalDistance = 0;
const galaxies: { x: number; y: number }[] = [];
map.forEach((row, y) =>
	row.forEach((node, x) => {
		if (node === '#') {
			galaxies.forEach((prevGalaxy) => {
				passedNumbers(x, prevGalaxy.x).forEach((col) => {
					totalDistance += extraCols.includes(col) ? 1_000_000 : 1;
					// totalDistance += extraCols.includes(col) ? 100 : 1;
				});
				passedNumbers(y, prevGalaxy.y).forEach((row) => {
					totalDistance += extraRows.includes(row) ? 1_000_000 : 1;
					// totalDistance += extraRows.includes(row) ? 100 : 1;
				});
			});
			galaxies.push({ x, y });
		}
	})
);

console.log(totalDistance);

function passedNumbers(from: number, to: number): number[] {
	if (from > to) {
		const t = from;
		from = to;
		to = t;
	}
	return Array.from({ length: to - from }, (_, index) => from + index + 1);
}
