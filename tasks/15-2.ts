import { input } from '../src/inputManager';

const boxes = Array.from<unknown, { label: string; value: number }[]>({ length: 256 }, () => []);

input.split(',').forEach((step) => {
	const { label, value } = getLens(step);
	const hash = getHash(label);
	const box = boxes[hash];
	if (value === undefined) {
		const index = box.findIndex((lens) => lens.label === label);
		if (index !== -1) box.splice(index, 1);
	} else {
		const lens = box.find((lens) => lens.label === label);
		if (lens) lens.value = value;
		else box.push({ label, value });
	}
});

let sum = 0;
boxes.forEach((box, indexBox) => {
	box.forEach((lens, indexLens) => {
		sum += (indexBox + 1) * (indexLens + 1) * lens.value;
	});
});
console.log(sum);

function getHash(str: string) {
	let hash = 0;
	for (const char of str) {
		hash += char.charCodeAt(0);
		hash *= 17;
		hash = hash % 256;
	}
	return hash;
}

function getLens(str: string) {
	let i = 0;
	for (; i < str.length; i++) {
		if (str[i] === '=' || str[i] === '-') break;
	}
	return {
		label: str.slice(0, i),
		value: str[i] === '=' ? Number(str.slice(i + 1)) : undefined,
	};
}
