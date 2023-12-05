import { input } from '../src/inputManager';

type Range = { start: number; end: number };

const [seeds, ...maps] = input.split('\n\n');
const seedNumbers = seeds
	.split(' ')
	.filter((str) => str.match(/^\d+$/))
	.map(Number);

let nextMapRanges: Range[] = [];
for (let i = 0; i < seedNumbers.length; i += 2) {
	nextMapRanges.push({ start: seedNumbers[i], end: seedNumbers[i] + seedNumbers[i + 1] - 1 });
}

maps.forEach((map) => {
	const [_desc, ...conversions] = map.split('\n');

	let unusedRanges: Range[] = nextMapRanges;
	nextMapRanges = [];
	conversions.forEach((line) => {
		const remainingRanges: Range[] = unusedRanges;
		unusedRanges = [];

		const [destinationStart, sourceStart, rangeLength] = line.split(' ').map(Number);
		const sourceRange: Range = { start: sourceStart, end: sourceStart + rangeLength - 1 };
		const destinationDiff = destinationStart - sourceStart;

		remainingRanges.forEach((range) => {
			const { inside, remaining } = rangeCompare(range, sourceRange);
			if (inside) {
				// The part of the range that is within the range
				nextMapRanges.push({
					start: inside.start + destinationDiff,
					end: inside.end + destinationDiff,
				});
			}
			unusedRanges.push(...remaining);
		});
	});
	// All conversions from this map are done
	nextMapRanges.push(...unusedRanges);
});

console.log(Math.min(...nextMapRanges.map(({ start }) => start)));

function rangeCompare(range: Range, target: Range): { inside?: Range; remaining: Range[] } {
	// Is there any part of the range that overlaps with the target
	const anyOverlap =
		Math.max(range.start, target.start) < Math.min(range.end, target.end) ||
		range.start === target.end ||
		range.end === target.start;
	if (!anyOverlap) return { remaining: [{ ...range }] };

	const start = range.start < target.start ? target.start : range.start;
	const end = range.end > target.end ? target.end : range.end;

	const remaining: Range[] = [];
	if (range.start < start) {
		remaining.push({ start: range.start, end: start - 1 });
	}
	if (end < range.end) {
		remaining.push({ start: end + 1, end: range.end });
	}

	return { inside: { start, end }, remaining };
}
