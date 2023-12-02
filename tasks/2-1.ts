import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const game = parser(line);
	if (game.minRed <= 12 && game.minGreen <= 13 && game.minBlue <= 14) {
		sum += game.id;
	}
});
console.log(sum);

function parser(line: string) {
	const [gameAndId, rounds] = line.split(': ');
	let minRed = 0,
		minGreen = 0,
		minBlue = 0;
	rounds.split('; ').forEach((round) => {
		const cubes = round.split(', ');
		cubes.forEach((cubeGroups) => {
			const [strAmount, color] = cubeGroups.split(' ');
			const amount = Number(strAmount);
			if (color === 'red' && amount > minRed) minRed = amount;
			if (color === 'green' && amount > minGreen) minGreen = amount;
			if (color === 'blue' && amount > minBlue) minBlue = amount;
		});
	});

	return { id: Number(gameAndId.split(' ')[1]), minRed, minGreen, minBlue };
}
