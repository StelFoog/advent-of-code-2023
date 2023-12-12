import { input } from '../src/inputManager';

type SpringState = '.' | '#' | '?';

let sum = 0;
input.split('\n').forEach((row, index) => {
	const rowSplits = row.split(' ');
	const springs = rowSplits[0].split('') as SpringState[];
	const unknownSpringIndexes: number[] = [];
	for (let i = 0; i < springs.length; i++) {
		if (springs[i] === '?') unknownSpringIndexes.push(i);
	}
	const brokenGroups = rowSplits[1].split(',').map(Number);
	const missingBroken =
		brokenGroups.reduce((prev, curr) => prev + curr, 0) - springs.filter((v) => v === '#').length;
	const permutations = createPermutations(springs, unknownSpringIndexes, missingBroken);
	// console.log('Group', index + 1);
	for (const springs of permutations) {
		let groupLength = 0;
		let currGroupIndex = 0;
		for (const spring of springs) {
			if (spring === '#') {
				groupLength++;
				continue;
			}
			if (groupLength) {
				if (groupLength !== brokenGroups[currGroupIndex]) break;
				currGroupIndex++;
				groupLength = 0;
			}
		}
		if (groupLength === brokenGroups[currGroupIndex]) {
			currGroupIndex++;
			groupLength = 0;
		}
		if (currGroupIndex === brokenGroups.length) {
			// console.log(springs.join(''));
			sum++;
		} else {
			// console.error(springs.join(''));
		}
	}
});
console.log(sum);

function createPermutations(
	springs: SpringState[],
	unknownSpringIndexes: number[],
	missingBroken: number
): SpringState[][] {
	if (!missingBroken) return [springs];
	if (!unknownSpringIndexes.length) return [];
	const result: SpringState[][] = [];
	for (let i = 0; i < unknownSpringIndexes.length; i++) {
		const index = unknownSpringIndexes[i];
		if (springs[index] !== '?') continue;
		result.push(
			...createPermutations(
				[...springs.slice(0, index), '#', ...springs.slice(index + 1)],
				unknownSpringIndexes.slice(i + 1),
				missingBroken - 1
			)
		);
	}

	return result;
}
