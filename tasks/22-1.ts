import { input } from '../src/inputManager';

type Coordinate = { x: number; y: number; z: number };
type Brick = { start: Coordinate; end: Coordinate };

const bricks = input
	.split('\n')
	.map<Brick>((line) => {
		const [start, end] = line.split('~');
		const [startX, startY, startZ] = start.split(',').map(Number);
		const [endX, endY, endZ] = end.split(',').map(Number);

		return {
			start: { x: startX, y: startY, z: startZ },
			end: { x: endX, y: endY, z: endZ },
		};
	})
	.sort((a, b) => minZ(a) - minZ(b));

const groundedBricks = new Set<number>();
bricks.forEach((brick, index) => {
	if (minZ(brick) === 1) groundedBricks.add(index);
});

const cantBeDestroyed = new Set<number>();
while (groundedBricks.size < bricks.length) {
	for (let i = 0; i < bricks.length; i++) {
		if (groundedBricks.has(i)) continue;

		let restsOn = findRestsOn(i);
		while (!restsOn && minZ(bricks[i]) > 1) {
			bricks[i].start.z--;
			bricks[i].end.z--;
			restsOn = findRestsOn(i);
		}

		if (minZ(bricks[i]) === 1) {
			groundedBricks.add(i);
		} else if (restsOn?.some((index) => groundedBricks.has(index))) {
			groundedBricks.add(i);
			const groundedRests = restsOn.filter((index) => groundedBricks.has(index));
			if (groundedRests.length === 1) cantBeDestroyed.add(groundedRests[0]);
		}
	}
}

console.log(bricks.length - cantBeDestroyed.size);

function findRestsOn(brickIndex: number) {
	const brick = bricks[brickIndex];
	const restsOn: number[] = [];

	for (let i = 0; i < bricks.length; i++) {
		if (i === brickIndex) continue;
		const test = bricks[i];
		if (maxZ(test) + 1 !== minZ(brick)) continue;
		if (bricksCross(brick, test)) restsOn.push(i);
	}
	return restsOn.length ? restsOn : null;
}

function maxZ({ start, end }: Brick) {
	return Math.max(start.z, end.z);
}

function minZ({ start, end }: Brick) {
	return Math.min(start.z, end.z);
}

function bricksCross(a: Brick, b: Brick) {
	return onBrick(a.start, b) || onBrick(a.end, b) || onBrick(b.start, a) || onBrick(b.end, a);
}

function onBrick(point: Coordinate, { start: a, end: b }: Brick) {
	return (
		point.x <= Math.max(a.x, b.x) &&
		point.x >= Math.min(a.x, b.x) &&
		point.y <= Math.max(a.y, b.y) &&
		point.y >= Math.min(a.y, b.y)
	);
}
