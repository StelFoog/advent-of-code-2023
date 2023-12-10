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

const cycle = map.map((row) => row.map(() => false));
cycle[startCoord.y][startCoord.x] = true;
const nodes = [{ ...startCoord, pipe: { ...map[startCoord.y][startCoord.x] } }];
while (nodes.length) {
	const { x, y, pipe } = nodes.shift()!;
	if (pipe.north && map[y - 1]?.[x]?.south && !cycle[y - 1][x]) {
		cycle[y - 1][x] = true;
		nodes.push({ x, y: y - 1, pipe: { ...map[y - 1][x] } });
	}
	if (pipe.south && map[y + 1]?.[x]?.north && !cycle[y + 1][x]) {
		cycle[y + 1][x] = true;
		nodes.push({ x, y: y + 1, pipe: { ...map[y + 1][x] } });
	}
	if (pipe.west && map[y]?.[x - 1]?.east && !cycle[y][x - 1]) {
		cycle[y][x - 1] = true;
		nodes.push({ x: x - 1, y, pipe: { ...map[y][x - 1] } });
	}
	if (pipe.east && map[y]?.[x + 1]?.west && !cycle[y][x + 1]) {
		cycle[y][x + 1] = true;
		nodes.push({ x: x + 1, y, pipe: { ...map[y][x + 1] } });
	}
}

let sum = 0;
cycle.forEach((row, y) => {
	let crossings = 0;
	let prev: Pipe = { north: false, south: false, west: false, east: false };
	row.forEach((node, x) => {
		const curr = map[y][x];
		if (node && (curr.north || curr.south)) {
			if (curr.west && prev.east && ((curr.north && prev.south) || (curr.south && prev.north))) {
				// They the pipe kept going up or down, the turns (in essance) didn't really happen, so we
				// count it as only one crossing
			} else {
				crossings++;
			}
			prev = curr;
		}

		if (crossings % 2 === 1 && !node) {
			// Crossings are not even and not a current pipe (based on Ray casting algorithm)
			sum++;
		}
	});
});

console.log(sum);
