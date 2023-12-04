import { input } from '../src/inputManager';

type Card = { winningNumbers: number[]; hadNumbers: number[] };

const cards = input.split('\n').map<Card>((line) => {
	const [, numbers] = line.split(/\:\s+/);
	const [winning, had] = numbers.split(/\s+\|\s+/);
	const winningNumbers = winning.split(/\s+/).map(Number);
	const hadNumbers = had.split(/\s+/).map(Number);
	return { winningNumbers, hadNumbers };
});

const cardCopies = cards.map(() => 1);
for (let i = 0; i < cardCopies.length; i++) {
	const cardAmount = cardCopies[i];
	const winings = cards[i].hadNumbers.filter((num) => cards[i].winningNumbers.includes(num)).length;

	for (let j = i + 1; j <= i + winings; j++) {
		cardCopies[j] += cardAmount;
	}
}
console.log(cardCopies.reduce((prev, curr) => prev + curr, 0));
