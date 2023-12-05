import { input } from '../src/inputManager';

const [seeds, ...maps] = input.split('\n\n');
let currNumbers = seeds
	.split(' ')
	.filter((str) => str.match(/^\d+$/))
	.map(Number);

maps.forEach((map) => {
	const nextNumbers: number[] = currNumbers.map((v) => v);
	const [_desc, ...conversions] = map.split('\n');

	conversions.forEach((line) => {
		const [destinationStart, sourceStart, rangeLength] = line.split(' ').map(Number);
		currNumbers.forEach((curr, index) => {
			if (sourceStart <= curr && curr < sourceStart + rangeLength) {
				nextNumbers[index] = destinationStart + (curr - sourceStart);
			}
		});
	});

	currNumbers = nextNumbers;
});

console.log(Math.min(...currNumbers));
