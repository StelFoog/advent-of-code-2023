import { input } from '../src/inputManager';

type Coordinate = { x: number; y: number; path: string; loss: number };

const map = input.split('\n').map((row) => row.split('').map(Number));
const visited = map.map((row) => row.map<Record<string, boolean>>(() => ({})));
const moves: Coordinate[] = [{ x: 0, y: 0, path: '', loss: 0 }];

while (true) {
	const move = moves.shift()!;
	if (!move) {
		break;
	}
	if (move.x === map[0].length - 1 && move.y === map.length - 1) {
		console.log(move.loss);
		break;
	}
	if (visited[move.y][move.x][move.path.slice(-3)]) continue;
	visited[move.y][move.x][move.path.slice(-3)] = true;

	if (move.x - 1 >= 0 && !move.path.endsWith('R') && !move.path.endsWith('LLL')) {
		const x = move.x - 1;
		const y = move.y;
		const path = move.path + 'L';
		const loss = move.loss + map[y][x];
		insertOrdered({ x, y, path, loss });
	}
	if (move.x + 1 < map[0].length && !move.path.endsWith('L') && !move.path.endsWith('RRR')) {
		const x = move.x + 1;
		const y = move.y;
		const path = move.path + 'R';
		const loss = move.loss + map[y][x];
		insertOrdered({ x, y, path, loss });
	}
	if (move.y - 1 >= 0 && !move.path.endsWith('D') && !move.path.endsWith('UUU')) {
		const x = move.x;
		const y = move.y - 1;
		const path = move.path + 'U';
		const loss = move.loss + map[y][x];
		insertOrdered({ x, y, path, loss });
	}
	if (move.y + 1 < map.length && !move.path.endsWith('U') && !move.path.endsWith('DDD')) {
		const x = move.x;
		const y = move.y + 1;
		const path = move.path + 'D';
		const loss = move.loss + map[y][x];
		insertOrdered({ x, y, path, loss });
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
