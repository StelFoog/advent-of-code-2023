import { input } from '../src/inputManager';

type Object = { x: number; m: number; a: number; s: number };
type Step = (object: Object) => 'A' | 'R' | string | null;

const [wfs, objects] = input.split('\n\n');

const workflows: Record<string, Step[]> = {};
const startpoint = 'in';
wfs.split('\n').forEach((line) => {
	const [, name, ops] = /([a-z]+){(.+)}/.exec(line)!;
	const steps = ops.split(',').map<Step>((step) => {
		if (!step.includes(':')) {
			return () => step;
		}

		const [cond, res] = step.split(':');
		const splt = cond.split(/[\<\>]/);
		const val = splt[0] as keyof Object;
		const num = Number(splt[1]);
		if (step.includes('>')) {
			return (object: Object) => (object[val] > num ? res : null);
		} else {
			return (object: Object) => (object[val] < num ? res : null);
		}
	});

	workflows[name] = steps;
});

let sum = 0;
objects.split('\n').forEach((line) => {
	const [x, m, a, s] = line
		.slice(1, -1)
		.split(',')
		.map((value) => Number(value.split('=')[1]));
	const object: Object = { x, m, a, s };

	let curr = startpoint;
	while (true) {
		const workflow = workflows[curr];

		for (const step of workflow) {
			const res = step(object);
			if (res === 'A') {
				sum += x + m + a + s;
				return;
			}
			if (res === 'R') {
				return;
			}
			if (res) {
				curr = res;
				break;
			}
		}
	}
});

console.log(sum);
