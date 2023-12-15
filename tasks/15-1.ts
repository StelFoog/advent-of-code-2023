import { input } from '../src/inputManager';

let sum = 0;
input.split(',').forEach((step) => {
	let hash = 0;
	for (const char of step) {
		hash += char.charCodeAt(0);
		hash *= 17;
		hash = hash % 256;
	}
	sum += hash;
});
console.log(sum);
