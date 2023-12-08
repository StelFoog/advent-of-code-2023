import { input } from '../src/inputManager';

const [instructions, mapDocument] = input.split('\n\n');

const map: Record<string, [string, string]> = {};
mapDocument.split('\n').forEach((line) => {
	const [at, options] = line.split(' = ');
	const [left, right] = options.split(', ');
	map[at] = [left.slice(1), right.slice(0, 3)];
});

let i = 0;
let curr = 'AAA';
while (curr !== 'ZZZ') {
	const go = instructions[i % instructions.length] as 'L' | 'R';
	curr = map[curr][go === 'L' ? 0 : 1];
	i++;
}

console.log(i);
