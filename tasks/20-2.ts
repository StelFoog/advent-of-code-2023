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

const target = 'rx';
let targetSender = '';
for (const [key, module] of Object.entries(modules)) {
	if (module.outputs.includes(target)) {
		targetSender = key;
		break;
	}
}
if (!targetSender) console.error('No target sender found');
const targetModule = modules[targetSender];
if (targetModule.type !== '&') throw 'Wierd shit!';

const cycleLengths: Record<string, number | null> = {};
Object.keys(targetModule.memory).forEach((key) => {
	cycleLengths[key] = null;
});

let pushes = 1;
for (; true; pushes++) {
	const steps: string[] = [];
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
			if (target === targetSender && signal === 'high' && cycleLengths[currName] === null) {
				cycleLengths[currName] = pushes;
			}
			sendSignal(signal, target, currName, steps);
		});
	}

	if (Object.values(cycleLengths).every((len) => len !== null)) {
		const lengths = Object.values(cycleLengths).map((len) => len!);
		console.log(lengths.reduce(lcm, 1));
		break;
	}
}

function sendSignal(type: 'high' | 'low', to: string, from: string, steps: string[]) {
	const target = modules[to];
	if (!target) return;
	if (target.type === '%') {
		if (type === 'high') return;
		target.isOn = !target.isOn;
	} else {
		target.memory[from] = type === 'high' ? true : false;
	}
	steps.push(to);
	return;
}

function lcm(a: number, b: number) {
	return Math.abs((a * b) / gcd(a, b));
}

function gcd(a: number, b: number) {
	a = Math.abs(a);
	b = Math.abs(b);
	while (b) {
		let t = b;
		b = a % b;
		a = t;
	}
	return a;
}
