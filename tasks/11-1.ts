import { input } from '../src/inputManager';

type SpaceNode = '.' | '#';

let map = input.split('\n').map((row) => row.split('') as SpaceNode[]);

const extraRows: number[] = [];
for (let i = 0; i < map.length; i++) {
	if (map[i].every((node) => node === '.')) extraRows.push(i);
}
extraRows.forEach((rowNr, index) => {
	map = [
		...map.slice(0, rowNr + index),
		Array.from({ length: map[0].length }, () => '.'),
		...map.slice(rowNr + index),
	];
});
const extraCols: number[] = [];
for (let i = 0; i < map[0].length; i++) {
	if (map.every((row) => row[i] === '.')) extraCols.push(i);
}
extraCols.forEach((colNr, index) => {
	map = map.map((row) => [...row.slice(0, colNr + index), '.', ...row.slice(colNr + index)]);
});

let totalDistance = 0;
const galaxies: { x: number; y: number }[] = [];
map.forEach((row, y) =>
	row.forEach((node, x) => {
		if (node === '#') {
			galaxies.forEach((prevGalaxy) => {
				totalDistance += Math.abs(prevGalaxy.x - x) + Math.abs(prevGalaxy.y - y);
			});
			galaxies.push({ x, y });
		}
	})
);

console.log(totalDistance);
