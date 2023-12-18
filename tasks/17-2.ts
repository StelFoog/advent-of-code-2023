import { input } from '../src/inputManager';

type Coordinate = { x: number; y: number; path: string; loss: number };

const map = input.split('\n').map((row) => row.split('').map(Number));
const moves: Coordinate[] = [{ x: 0, y: 0, path: '', loss: 0 }];
const visited = new Set<string>();

while (true) {
	const move = moves.shift()!;
	if (!move) {
		break;
	}
	if (move.x === map[0].length - 1 && move.y === map.length - 1) {
		console.log(move.loss);
		break;
	}
	const visitKey = `${move.x}-${move.y}${move.path.slice(-1)}`;
	if (visited.has(visitKey)) continue;
	visited.add(visitKey);

	if (!move.path.endsWith('L') && !move.path.endsWith('R')) {
		for (let i = 4; i <= 10 && move.x - i >= 0; i++) {
			const path = move.path + 'L'.repeat(i);
			insertOrdered({ x: move.x - i, y: move.y, path, loss: getLossFromPath(path) });
		}
		for (let i = 4; i <= 10 && move.x + i < map[0].length; i++) {
			const path = move.path + 'R'.repeat(i);
			insertOrdered({ x: move.x + i, y: move.y, path, loss: getLossFromPath(path) });
		}
	}

	if (!move.path.endsWith('U') && !move.path.endsWith('D')) {
		for (let i = 4; i <= 10 && move.y - i >= 0; i++) {
			const path = move.path + 'U'.repeat(i);
			insertOrdered({ x: move.x, y: move.y - i, path, loss: getLossFromPath(path) });
		}
		for (let i = 4; i <= 10 && move.y + i < map.length; i++) {
			const path = move.path + 'D'.repeat(i);
			insertOrdered({ x: move.x, y: move.y + i, path, loss: getLossFromPath(path) });
		}
	}
}

function insertOrdered(coord: Coordinate) {
	let index = 0;
	for (const curr of moves) {
		if (curr.loss > coord.loss) break;
		index++;
	}
	moves.splice(index, 0, coord);
}

function getLossFromPath(path: string) {
	let x = 0,
		y = 0,
		loss = 0;
	for (const char of path) {
		switch (char) {
			case 'L':
				x--;
				break;
			case 'R':
				x++;
				break;
			case 'U':
				y--;
				break;
			case 'D':
				y++;
				break;
		}
		loss += map[y][x];
	}
	return loss;
}
