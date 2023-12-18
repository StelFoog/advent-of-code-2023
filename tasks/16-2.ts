import { input } from '../src/inputManager';

type Light = { x: number; y: number; dir: 'L' | 'R' | 'U' | 'D' };

const map = input.split('\n').map((row) => row.split('') as ('.' | '/' | '\\' | '|' | '-')[]);

let highest = 0;
for (let i = 0; i < map.length; i++) {
	const energizedLeft = energizedSpacesFrom({ x: 0, y: i, dir: 'R' });
	if (energizedLeft > highest) highest = energizedLeft;
	const energizedRight = energizedSpacesFrom({ x: map[i].length - 1, y: i, dir: 'L' });
	if (energizedRight > highest) highest = energizedRight;
}
for (let i = 0; i < map[0].length; i++) {
	const energizedDown = energizedSpacesFrom({ x: i, y: 0, dir: 'D' });
	if (energizedDown > highest) highest = energizedDown;
	const energizedUp = energizedSpacesFrom({ x: i, y: map.length - 1, dir: 'U' });
	if (energizedUp > highest) highest = energizedUp;
}

console.log(highest);

function energizedSpacesFrom(initial: Light) {
	let lights: Light[] = [initial];
	const energized = map.map((row) => row.map<Light['dir'][]>(() => []));

	while (lights.length) {
		const nextLights: Light[] = [];
		lights.forEach((light) => {
			if (energized[light.y][light.x].includes(light.dir)) return;
			energized[light.y][light.x].push(light.dir);

			let nextX = light.x;
			let nextY = light.y;
			let nextDir = light.dir;
			switch (map[light.y][light.x]) {
				case '.':
					switch (light.dir) {
						case 'L':
							nextX--;
							break;
						case 'R':
							nextX++;
							break;
						case 'U':
							nextY--;
							break;
						case 'D':
							nextY++;
							break;
					}
					break;
				case '-':
					switch (light.dir) {
						case 'L':
							nextX--;
							break;
						case 'R':
							nextX++;
							break;
						case 'U':
						case 'D':
							nextX--;
							nextDir = 'L';
							const splitLight: Light = { x: light.x + 1, y: light.y, dir: 'R' };
							if (splitLight.x < map[0].length) {
								nextLights.push(splitLight);
							}
							break;
					}
					break;
				case '|':
					switch (light.dir) {
						case 'L':
						case 'R':
							nextY--;
							nextDir = 'U';
							const splitLight: Light = { x: light.x, y: light.y + 1, dir: 'D' };
							if (splitLight.y < map.length) {
								nextLights.push(splitLight);
							}
							break;
						case 'U':
							nextY--;
							break;
						case 'D':
							nextY++;
							break;
					}
					break;
				case '/':
					switch (light.dir) {
						case 'L':
							nextY++;
							nextDir = 'D';
							break;
						case 'R':
							nextY--;
							nextDir = 'U';
							break;
						case 'U':
							nextX++;
							nextDir = 'R';
							break;
						case 'D':
							nextX--;
							nextDir = 'L';
							break;
					}
					break;
				case '\\':
					switch (light.dir) {
						case 'L':
							nextY--;
							nextDir = 'U';
							break;
						case 'R':
							nextY++;
							nextDir = 'D';
							break;
						case 'U':
							nextX--;
							nextDir = 'L';
							break;
						case 'D':
							nextX++;
							nextDir = 'R';
							break;
					}
					break;
			}
			if (nextX >= 0 && nextX < map[0].length && nextY >= 0 && nextY < map.length) {
				nextLights.push({ x: nextX, y: nextY, dir: nextDir });
			}
		});

		lights = nextLights;
	}

	let sum = 0;
	energized.forEach((row) => {
		row.forEach((dirs) => {
			if (dirs.length) sum++;
		});
	});
	return sum;
}
