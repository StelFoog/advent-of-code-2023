import { input } from '../src/inputManager';

const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
type CardKind = (typeof CARDS)[number];

type Hand = {
	cards: CardKind[];
	bid: number;
};

const hands = input
	.split('\n')
	.map<Hand>((line) => {
		const [cards, bid] = line.split(' ');
		return { cards: cards.split('') as CardKind[], bid: Number(bid) };
	})
	.sort((a, b) => {
		const typeValueA = cardTypeValue(a.cards);
		const typeValueB = cardTypeValue(b.cards);
		if (typeValueA > typeValueB) return 1;
		if (typeValueA < typeValueB) return -1;
		for (let i = 0; i < 5; i++) {
			if (CARDS.indexOf(a.cards[i]) < CARDS.indexOf(b.cards[i])) return 1;
			if (CARDS.indexOf(a.cards[i]) > CARDS.indexOf(b.cards[i])) return -1;
		}
		return 0;
		// TODO: Check cards
	});

console.log(hands.reduce((prev, curr, index) => prev + curr.bid * (index + 1), 0));

function cardTypeValue(cards: CardKind[]) {
	const groups = cards
		.reduce((prev, curr) => {
			for (let i = 0; i < prev.length; i++) {
				const group = prev[i];
				if (group[0] === curr) return [...prev.slice(0, i), [...group, curr], ...prev.slice(i + 1)];
			}
			return [...prev, [curr]];
		}, [] as CardKind[][])
		.sort((a, b) => b.length - a.length);

	// Five of a kind
	if (groups[0].length === 5) return 6;
	// Four of a kind
	if (groups[0].length === 4) return 5;
	// Full house
	if (groups[0].length === 3 && groups[1].length === 2) return 4;
	// Three of a kind
	if (groups[0].length === 3) return 3;
	// Two pair
	if (groups[0].length === 2 && groups[1].length === 2) return 2;
	// One pair
	if (groups[0].length === 2) return 1;
	// Highest card
	return 0;
}
