import { input } from '../src/inputManager';

const CARDS = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] as const;
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
		return 0; // Should never happen, but just to cover all bases
	});

console.log(hands.reduce((prev, curr, index) => prev + curr.bid * (index + 1), 0));

function cardTypeValue(cards: CardKind[]) {
	let groups = cards
		.reduce((prev, curr) => {
			for (let i = 0; i < prev.length; i++) {
				const group = prev[i];
				if (group[0] === curr) return [...prev.slice(0, i), [...group, curr], ...prev.slice(i + 1)];
			}
			return [...prev, [curr]];
		}, [] as CardKind[][])
		.sort((a, b) => b.length - a.length);
	const jokersIndex = groups.findIndex((group) => group[0] === 'J');
	let jokers = 0;
	if (jokersIndex !== -1) {
		jokers = groups[jokersIndex].length;
		groups = [...groups.slice(0, jokersIndex), ...groups.slice(jokersIndex + 1)];
	}

	// Five of a kind   - Max 5 jokers
	if ((groups[0]?.length ?? 0) + jokers === 5) return 6;
	// Four of a kind   - Max 3 jokers
	if (groups[0].length + jokers === 4) return 5;
	// Full house       - Max 1 joker
	if (groups[0].length + jokers === 3 && groups[1].length === 2) return 4;
	// Three of a kind  - Max 1 joker
	if (groups[0].length + jokers === 3) return 3;
	// Two pair         - Max 0 jokers
	if (groups[0].length === 2 && groups[1].length === 2) return 2;
	// One pair         - Max 1 joker
	if (groups[0].length + jokers === 2) return 1;
	// Highest card     - Max 0 jokers
	return 0;
}
