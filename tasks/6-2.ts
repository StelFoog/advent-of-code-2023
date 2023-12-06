import { input } from '../src/inputManager';

const [times, records] = input.split('\n');

const [, ...timeValue] = times.split(/\s+/);
const [, ...recordValue] = records.split(/\s+/);
const race: { time: number; record: number } = {
	time: Number(timeValue.join('')),
	record: Number(recordValue.join('')),
};

let ways = 0;
for (let i = 1; i < race.time; i++) {
	const remaining = race.time - i;
	if (remaining * i > race.record) ways++;
}

console.log(ways);
