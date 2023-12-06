import { input } from '../src/inputManager';

const [times, records] = input.split('\n');
const races: { time: number; record: number }[] = [];

const [, ...timeValues] = times.split(/\s+/);
const [, ...recordValues] = records.split(/\s+/);
for (let i = 0; i < timeValues.length; i++) {
	races.push({ time: Number(timeValues[i]), record: Number(recordValues[i]) });
}

const waysToWin = races.map(({ time, record }, _idx) => {
	let ways = 0;
	for (let i = 1; i < time; i++) {
		const remaining = time - i;
		if (remaining * i > record) ways++;
	}
	return ways;
});

console.log(waysToWin.reduce((prev, curr) => prev * curr, 1));
