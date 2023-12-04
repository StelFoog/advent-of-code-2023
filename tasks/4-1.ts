import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const [, numbers] = line.split(/\:\s+/);
	const [winning, had] = numbers.split(/\s+\|\s+/);
	const winningNumbers = winning.split(/\s+/).map(Number);
	const hadNumbers = had.split(/\s+/).map(Number);

	let numbersHad = hadNumbers.filter((number) => winningNumbers.includes(number)).length;
	if (numbersHad) {
		let points = 1;
		for (let i = 1; i < numbersHad; i++) points *= 2;
		sum += points;
	}
});
console.log(sum);
