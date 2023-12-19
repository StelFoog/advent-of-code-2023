import { input } from '../src/inputManager';

type Range = { from: number; to: number };
type Object = { x: Range; m: Range; a: Range; s: Range };
type ConditionalStep = { condition: keyof Object; sign: '<' | '>'; number: number; result: string };
type Step = ConditionalStep | string;

const wfs = input.split('\n\n')[0];

const workflows: Record<string, Step[]> = {};
wfs.split('\n').forEach((line) => {
	const [, name, ops] = /([a-z]+){(.+)}/.exec(line)!;
	const steps = ops.split(',').map<Step>((step) => {
		if (!step.includes(':')) {
			return step;
		}

		const [cond, res] = step.split(':');
		const splt = cond.split(/[\<\>]/);
		const val = splt[0] as keyof Object;
		const num = Number(splt[1]);
		return { condition: val, sign: step.includes('>') ? '>' : '<', number: num, result: res };
	});

	workflows[name] = steps;
});

const startpoint = 'in';
const baseRange: Range = { from: 1, to: 4000 };
console.log(
	findInRange(
		{ x: { ...baseRange }, m: { ...baseRange }, a: { ...baseRange }, s: { ...baseRange } },
		startpoint
	)
);

function findInRange(object: Object, curr: string): number {
	let sum = 0;
	const workflow = workflows[curr];

	for (const step of workflow) {
		if (typeof step === 'string') {
			if (step === 'A') {
				sum += getNumOfObjects(object);
			} else if (step !== 'R') {
				sum += findInRange(object, step);
			}
			break;
		}

		const { old, split } = splitRange(object, step);
		if (split) {
			if (step.result === 'A') {
				sum += getNumOfObjects(split);
			} else if (step.result !== 'R') {
				sum += findInRange(split, step.result);
			}
		}
		if (!old) break;
		object = old;
	}

	return sum;
}

function splitRange(object: Object, step: ConditionalStep): { old?: Object; split?: Object } {
	const targetRange = object[step.condition];

	switch (step.sign) {
		case '<':
			if (targetRange.from >= step.number) {
				return { old: copy(object) };
			}
			if (targetRange.to < step.number) {
				return { split: copy(object) };
			}
			return {
				old: {
					...copy(object),
					[step.condition]: {
						from: step.number,
						to: object[step.condition].to,
					},
				},
				split: {
					...copy(object),
					[step.condition]: {
						from: object[step.condition].from,
						to: step.number - 1,
					},
				},
			};
		case '>':
			if (targetRange.to <= step.number) {
				return { old: copy(object) };
			}
			if (targetRange.from > step.number) {
				return { split: copy(object) };
			}
			return {
				old: {
					...copy(object),
					[step.condition]: {
						from: object[step.condition].from,
						to: step.number,
					},
				},
				split: {
					...copy(object),
					[step.condition]: {
						from: step.number + 1,
						to: object[step.condition].to,
					},
				},
			};
	}
}

function getNumOfObjects(object: Object) {
	return (
		(object.x.to - object.x.from + 1) *
		(object.m.to - object.m.from + 1) *
		(object.a.to - object.a.from + 1) *
		(object.s.to - object.s.from + 1)
	);
}

function copy(object: Object): Object {
	return JSON.parse(JSON.stringify(object));
}
