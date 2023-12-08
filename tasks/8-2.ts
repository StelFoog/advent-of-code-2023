import { input } from '../src/inputManager';

const [instructions, mapDocument] = input.split('\n\n');

const map: Record<string, [string, string]> = {};

mapDocument.split('\n').forEach((line) => {
	const [at, options] = line.split(' = ');
	const [left, right] = options.split(', ');
	map[at] = [left.slice(1), right.slice(0, 3)];
});

let currNodes = Object.keys(map).filter((key) => key[2] === 'A');
let goals = currNodes.map(() => NaN);
let i = 0;
while (goals.some(isNaN)) {
	currNodes = currNodes.map((node, index) => {
		if (node.endsWith('Z') && isNaN(goals[index])) goals[index] = i;
		const go = instructions[i % instructions.length] === 'L' ? 0 : 1;
		return map[node][go];
	});
	i++;
}
console.log(goals.reduce(lcm, 1));

function lcm(a: number, b: number) {
	return Math.abs((a * b) / gcd(a, b));
}

function gcd(a: number, b: number) {
	a = Math.abs(a);
	b = Math.abs(b);
	while (b) {
		let t = b;
		b = a % b;
		a = t;
	}
	return a;
}
