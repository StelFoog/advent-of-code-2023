import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const values = line.split(' ').map(Number);
	sum += prevValue(values);
});
console.log(sum);

function prevValue(values: number[]): number {
	if (!values.length) throw 'No values provided';
	if (values.every((value) => value === values[0])) return values[0];
	const diffrances: number[] = [];
	for (let i = 1; i < values.length; i++) {
		diffrances.push(values[i] - values[i - 1]);
	}
	const diffrancePrev = prevValue(diffrances);
	return values[0] - diffrancePrev;
}
