import { input } from '../src/inputManager';

type Module =
	| { type: '%'; isOn: boolean; outputs: string[] }
	| { type: '&'; memory: Record<string, boolean>; outputs: string[] };

let broadcaster: string[] = [];
const modules: Record<string, Module> = {};
input.split('\n').forEach((line) => {
	const [node, outputString] = line.split(' -> ');
	const outputs = outputString.split(', ');
	if (node === 'broadcaster') {
		broadcaster = outputs;
	} else if (node.startsWith('%')) {
		modules[node.slice(1)] = { type: '%', isOn: false, outputs };
	} else if (node.startsWith('&')) {
		modules[node.slice(1)] = { type: '&', memory: {}, outputs };
	}
});

broadcaster.forEach((out) => {
	const target = modules[out];
	if (target.type === '&') {
		target.memory.broadcaster = false;
	}
});
Object.entries(modules).forEach(([name, module]) => {
	module.outputs.forEach((out) => {
		const target = modules[out];
		if (target?.type === '&') {
			target.memory[name] = false;
		}
	});
});

let lowSent = 0;
let highSent = 0;
for (let i = 0; i < 1_000; i++) {
	const steps: string[] = [];
	lowSent++;
	broadcaster.forEach((target) => {
		sendSignal('low', target, 'broadcaster', steps);
	});

	while (steps.length) {
		const currName = steps.shift()!;
		const curr = modules[currName];
		let signal: 'high' | 'low';
		if (curr.type === '%') {
			signal = curr.isOn ? 'high' : 'low';
		} else {
			signal = Object.values(curr.memory).every((val) => val) ? 'low' : 'high';
		}
		curr.outputs.forEach((target) => {
			sendSignal(signal, target, currName, steps);
		});
	}
}
console.log(lowSent * highSent);

function sendSignal(type: 'high' | 'low', to: string, from: string, steps: string[]) {
	if (type === 'high') {
		highSent++;
	} else {
		lowSent++;
	}

	const target = modules[to];
	if (!target) return;
	if (target.type === '%') {
		if (type === 'high') return;
		target.isOn = !target.isOn;
	} else {
		target.memory[from] = type === 'high' ? true : false;
	}
	steps.push(to);
}
