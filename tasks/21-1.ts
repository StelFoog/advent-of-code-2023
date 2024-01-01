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

const cache: Record<string, Coordinate[]> = {};

const STEPS = 64;
console.log(possibleLocations(startPoint!, STEPS).length);

function possibleLocations({ x, y }: Coordinate, stepsLeft: number): Coordinate[] {
	if (stepsLeft === 0) return [{ x, y }];
	const cacheKey = `${x}|${y}|${stepsLeft}`;
	if (cache[cacheKey]) return [...cache[cacheKey]];

	const locations: Coordinate[] = [];
	if (x - 1 >= 0 && map[y][x - 1] !== '#') {
		locations.push(...possibleLocations({ y, x: x - 1 }, stepsLeft - 1));
	}
	if (x + 1 < map[y].length && map[y][x + 1] !== '#') {
		locations.push(...possibleLocations({ y, x: x + 1 }, stepsLeft - 1));
	}
	if (y - 1 >= 0 && map[y - 1][x] !== '#') {
		locations.push(...possibleLocations({ y: y - 1, x }, stepsLeft - 1));
	}
	if (y + 1 < map.length && map[y + 1][x] !== '#') {
		locations.push(...possibleLocations({ y: y + 1, x }, stepsLeft - 1));
	}

	const hits = new Set<string>();
	const uniqueLocations = locations.filter((loc) => {
		const key = `${loc.x}|${loc.y}`;
		if (hits.has(key)) return false;
		hits.add(key);
		return true;
	});
	cache[cacheKey] = uniqueLocations;
	return uniqueLocations;
}
