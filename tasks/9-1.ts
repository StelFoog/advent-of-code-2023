import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const values = line.split(' ').map(Number);
	sum += nextValue(values);
});
console.log(sum);

function nextValue(values: number[]): number {
	if (!values.length) throw 'No values provided';
	if (values.every((value) => value === values[0])) return values[0];
	const diffrances: number[] = [];
	for (let i = 1; i < values.length; i++) {
		diffrances.push(values[i] - values[i - 1]);
	}
	const diffranceNext = nextValue(diffrances);
	return values[values.length - 1] + diffranceNext;
}
