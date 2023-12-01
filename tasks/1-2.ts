import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const nums = parser(line);
	sum += Number(nums[0] + nums[nums.length - 1]);
});
console.log(sum);

const NUM_STRINGS = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};
const NUMBERS = Object.keys(NUM_STRINGS) as (keyof typeof NUM_STRINGS)[];
function parser(str: string): string {
	let res = '';
	for (let i = 0; i < str.length; i++) {
		if (str.charAt(i).match(/\d/)) {
			res += str.charAt(i);
			continue;
		}
		for (const num of NUMBERS) {
			if (str.substring(i).startsWith(num)) {
				res += NUM_STRINGS[num];
				break;
			}
		}
	}
	return res;
}
