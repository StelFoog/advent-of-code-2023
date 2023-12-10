import { input } from '../src/inputManager';

type Pipe = { north: boolean; south: boolean; west: boolean; east: boolean };
const startCoord = { x: NaN, y: NaN };

const map = input.split('\n').map((line, yCoord) =>
	line.split('').map<Pipe>((char, xCoord) => {
		switch (char) {
			case 'S':
				startCoord.x = xCoord;
				startCoord.y = yCoord;
				return { north: true, south: true, west: true, east: true };
			case '|':
				return { north: true, south: true, west: false, east: false };
			case '-':
				return { north: false, south: false, west: true, east: true };
			case 'L':
				return { north: true, south: false, west: false, east: true };
			case 'J':
				return { north: true, south: false, west: true, east: false };
			case '7':
				return { north: false, south: true, west: true, east: false };
			case 'F':
				return { north: false, south: true, west: false, east: true };
			default:
				return { north: false, south: false, west: false, east: false };
		}
	})
);

const distances = { [`${startCoord.y}-${startCoord.x}`]: 0 };

const nodes = [{ ...startCoord, pipe: map[startCoord.y][startCoord.x], distance: 0 }];
while (nodes.length) {
	const { x, y, pipe, distance } = nodes.shift()!;
	if (pipe.north && map[y - 1]?.[x]?.south && getDistance(x, y - 1) === undefined) {
		setDistance(x, y - 1, distance + 1);
		nodes.push({ x, y: y - 1, pipe: map[y - 1][x], distance: distance + 1 });
	}
	if (pipe.south && map[y + 1]?.[x]?.north && getDistance(x, y + 1) === undefined) {
		setDistance(x, y + 1, distance + 1);
		nodes.push({ x, y: y + 1, pipe: map[y + 1][x], distance: distance + 1 });
	}
	if (pipe.west && map[y]?.[x - 1]?.east && getDistance(x - 1, y) === undefined) {
		setDistance(x - 1, y, distance + 1);
		nodes.push({ x: x - 1, y, pipe: map[y][x - 1], distance: distance + 1 });
	}
	if (pipe.east && map[y]?.[x + 1]?.west && getDistance(x + 1, y) === undefined) {
		setDistance(x + 1, y, distance + 1);
		nodes.push({ x: x + 1, y, pipe: map[y][x + 1], distance: distance + 1 });
	}
}

console.log(Object.values(distances).sort((a, b) => b - a)[0]);

function getDistance(x: number, y: number) {
	return distances[`${y}-${x}`];
}

function setDistance(x: number, y: number, distance: number) {
	distances[`${y}-${x}`] = distance;
}
