import { input } from '../src/inputManager';

const points: { x: number; y: number }[] = [{ x: 0, y: 0 }];
let lastPoint = points[0];
let totalLen = 0;

function shoelaceArea() {
	let sum = 0;
	for (let i = 0; i < points.length; i++) {
		const point = points[i];
		const next = points[(i + 1) % points.length];
		sum += point.x * next.y - next.x * point.y;
	}
	return Math.abs(sum) / 2;
}

input.split('\n').forEach((row) => {
	const [_direction, _spaces, hex] = row.split(' ');
	let dir: 'L' | 'R' | 'U' | 'D' = 'U';
	switch (hex.slice(-2, -1)) {
		case '0':
			dir = 'R';
			break;
		case '1':
			dir = 'D';
			break;
		case '2':
			dir = 'L';
			break;
	}
	const len = parseInt(hex.slice(2, -2), 16);
	totalLen += len;

	const nextPoint = { ...lastPoint };
	switch (dir) {
		case 'L':
			nextPoint.x -= len;
			break;
		case 'R':
			nextPoint.x += len;
			break;
		case 'U':
			nextPoint.y -= len;
			break;
		case 'D':
			nextPoint.y += len;
			break;
	}

	lastPoint = { ...nextPoint };
	if (!points.some(({ x, y }) => x === nextPoint.x && y === nextPoint.y)) points.push(nextPoint);
});

// Pick's theorem
const A = shoelaceArea();
const b = totalLen;
const i = A + 1 - Math.floor(b / 2);

// Sum of all points on the border and all inner points
console.log(b + i);
