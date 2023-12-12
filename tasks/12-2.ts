import { input } from '../src/inputManager';

const cache: Record<string, number> = {};

type SpringState = '.' | '#' | '?';

let sum = 0;
input.split('\n').forEach((row) => {
	const rowSplits = row.split(' ');
	const springs = springDuplication(rowSplits[0].split('') as SpringState[]);
	const brokenGroups = `${rowSplits[1]},`.repeat(5).slice(0, -1).split(',').map(Number);

	sum += numValid(springs, brokenGroups);
});
console.log(sum);

function numValid(springs: SpringState[], brokenGroups: number[]) {
	if (!springs.length) return brokenGroups.length ? 0 : 1;

	if (!brokenGroups.length) return springs.includes('#') ? 0 : 1;

	const cacheKey = springs.join('') + '-' + brokenGroups.join(',');
	if (cache[cacheKey] !== undefined) return cache[cacheKey];

	let result = 0;
	if (['.', '?'].includes(springs[0])) {
		result += numValid(springs.slice(1), brokenGroups);
	}
	if (
		// There are at least as many springs as there are broken springs
		brokenGroups[0] <= springs.length &&
		// There are no unbroken springs in this group
		!springs.slice(0, brokenGroups[0]).includes('.') &&
		// The next spring (if there is one) isn't already broken
		springs[brokenGroups[0]] !== '#'
	) {
		result += numValid(springs.slice(brokenGroups[0] + 1), brokenGroups.slice(1));
	}

	cache[cacheKey] = result;
	return result;
}

function springDuplication(springs: SpringState[]) {
	const result = springs.map((v) => v);
	for (let i = 1; i <= 4; i++) {
		result.push('?', ...springs);
	}
	return result;
}
