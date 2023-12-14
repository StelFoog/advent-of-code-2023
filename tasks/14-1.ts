import { input } from '../src/inputManager';

const rows = input.split('\n');

for (let i = 1; i < rows.length; i++) {
	for (let j = i; j >= 1; j--) {
		for (let x = 0; x < rows[j].length; x++) {
			if (rows[j - 1][x] !== '.' || rows[j][x] !== 'O') continue;
			const above = rows[j - 1];
			rows[j - 1] = above.slice(0, x) + 'O' + above.slice(x + 1);
			const curr = rows[j];
			rows[j] = curr.slice(0, x) + '.' + curr.slice(x + 1);
		}
	}
}

let sum = 0;
rows.forEach((row, index) => {
	for (let i = 0; i < row.length; i++) {
		if (row[i] === 'O') sum += rows.length - index;
	}
});
console.log(sum);
