import { input } from '../src/inputManager';

const points: { x: number; y: number }[] = [{ x: 0, y: 0 }];
let maxX = 0;
let minX = 0;
let maxY = 0;
let minY = 0;
let lastPoint = points[0];

input.split('\n').forEach((row) => {
	const [direction, spaces] = row.split(' ');
	const dir = direction as 'L' | 'R' | 'U' | 'D';
	const len = Number(spaces);

	for (let i = 0; i < len; i++) {
		const nextPoint = { ...lastPoint };
		switch (dir) {
			case 'L':
				nextPoint.x--;
				break;
			case 'R':
				nextPoint.x++;
				break;
			case 'U':
				nextPoint.y--;
				break;
			case 'D':
				nextPoint.y++;
				break;
		}
		if (nextPoint.x > maxX) maxX = nextPoint.x;
		if (nextPoint.x < minX) minX = nextPoint.x;
		if (nextPoint.y > maxY) maxY = nextPoint.y;
		if (nextPoint.y < minY) minY = nextPoint.y;

		lastPoint = { ...nextPoint };
		if (!points.some(({ x, y }) => x === nextPoint.x && y === nextPoint.y)) points.push(nextPoint);
	}
});

const map = Array.from({ length: maxY - minY + 1 }, () =>
	Array.from<unknown, 'B' | 'F' | '.'>({ length: maxX - minX + 1 }, () => '.')
);

points.forEach((point) => {
	map[point.y - minY][point.x - minX] = 'B';
});
let sum = points.length;
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] !== '.') continue;
		let crossings = 0;
		for (let i = 0; i < x; i++) {
			if (map[y][i] === 'B' && (map[y][i - 1] !== 'B' || map[y][i + 1] !== 'B')) {
				if ((map[y][i - 1] !== 'B' && map[y][i + 1] !== 'B') || map[y - 1]?.[i] === 'B') {
					crossings++;
				}
			}
		}
		if (crossings % 2 === 1) {
			map[y][x] = 'F';
			sum++;
		}
	}
}

console.log(sum);
