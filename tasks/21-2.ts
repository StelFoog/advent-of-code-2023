import { input } from '../src/inputManager';

type Coordinate = { x: number; y: number };

const tempMap = input.split('\n').map((row) => row.split(''));

let startPoint: Coordinate | undefined = undefined;
for (let y = 0; y < tempMap.length; y++) {
	for (let x = 0; x < tempMap[y].length; x++) {
		const char = tempMap[y][x];
		if (char === 'S') {
			startPoint = { x, y };
			tempMap[y][x] = '.';
			break;
		}
	}
	if (startPoint) break;
}
const map = tempMap as ('.' | '#')[][];

const STEPS = 26501365;
const STEPS_MOD = STEPS % 2;

const startDistances = bfs(startPoint!);
// Assume startpoint is in the middle
const northDistances = bfs({ x: startPoint!.x, y: 0 });
const southDistances = bfs({ x: startPoint!.x, y: map.length - 1 });
const westDistances = bfs({ x: 0, y: startPoint!.y });
const eastDistances = bfs({ x: map.length - 1, y: startPoint!.y });

const nwDistances = bfs({ x: 0, y: 0 });
const neDistances = bfs({ x: map.length - 1, y: 0 });
const swDistances = bfs({ x: 0, y: map.length - 1 });
const seDistances = bfs({ x: map.length - 1, y: map.length - 1 });

let sum = 0;
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map.length; x++) {
		if (map[y][x] === '#' || !isFinite(startDistances[y][x])) continue;

		const { x: startX, y: startY } = startPoint!;
		if (startDistances[y][x] <= STEPS && startDistances[y][x] % 2 === STEPS_MOD) {
			sum++;
		}
		sum += diagonalOptions(nwDistances[startY][startX] + seDistances[y][x]);
		sum += diagonalOptions(neDistances[startY][startX] + swDistances[y][x]);
		sum += diagonalOptions(swDistances[startY][startX] + neDistances[y][x]);
		sum += diagonalOptions(seDistances[startY][startX] + nwDistances[y][x]);
		// Assumes there are no rocks in the lines directly north, west, south, and east of startpoint
		sum += straightOptions(
			nwDistances[startY][startX] + swDistances[y][x],
			neDistances[startY][startX] + seDistances[y][x],
			northDistances[startY][startX] + southDistances[y][x]
		);
		sum += straightOptions(
			nwDistances[startY][startX] + neDistances[y][x],
			swDistances[startY][startX] + seDistances[y][x],
			westDistances[startY][startX] + eastDistances[y][x]
		);
		sum += straightOptions(
			swDistances[startY][startX] + nwDistances[y][x],
			seDistances[startY][startX] + neDistances[y][x],
			southDistances[startY][startX] + northDistances[y][x]
		);
		sum += straightOptions(
			neDistances[startY][startX] + nwDistances[y][x],
			seDistances[startY][startX] + swDistances[y][x],
			eastDistances[startY][startX] + westDistances[y][x]
		);
	}
}
console.log(sum);

function bfs(from: Coordinate): number[][] {
	const distances = map.map((row) => row.map(() => Number.POSITIVE_INFINITY));
	const list = [{ order: 0, value: { ...from } }];
	while (list.length) {
		const {
			order: distance,
			value: { x, y },
		} = list.shift()!;
		if (map[y][x] === '#' || Number.isFinite(distances[y][x])) continue;
		distances[y][x] = distance;

		if (x - 1 >= 0 && map[y][x - 1] !== '#')
			list.push({ order: distance + 1, value: { x: x - 1, y } });
		if (x + 1 < map[y].length && map[y][x + 1] !== '#')
			list.push({ order: distance + 1, value: { x: x + 1, y } });
		if (y - 1 >= 0 && map[y - 1][x] !== '#')
			list.push({ order: distance + 1, value: { x, y: y - 1 } });
		if (y + 1 < map.length && map[y + 1][x] !== '#')
			list.push({ order: distance + 1, value: { x, y: y + 1 } });
	}
	return distances;
}

function diagonalOptions(distance: number): number {
	// Map is square
	const gridsCovered = Math.floor((STEPS - distance - 2) / map.length);

	if (distance % 2 === STEPS_MOD) {
		const hits = Math.floor(gridsCovered / 2) + 1;
		return hits * hits;
	} else {
		const hits = Math.floor((gridsCovered + 1) / 2);
		return hits * (hits + 1);
	}
}

function straightOptions(...distances: number[]): number {
	const distance = Math.min(...distances);
	// Map is square
	const gridsCovered = Math.floor((STEPS - distance - 1) / map.length);
	return Math.floor((gridsCovered + (distance % 2 === STEPS_MOD ? 1 : 2)) / 2);
}
