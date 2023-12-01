import { input } from '../src/inputManager';

let sum = 0;
input.split('\n').forEach((line) => {
	const nums = line.replace(/[^\d]/g, '');
	sum += Number(nums[0] + nums[nums.length - 1]);
});
console.log(sum);
