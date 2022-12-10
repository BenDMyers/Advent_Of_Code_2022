import fs from 'fs';
import { sum } from '../utils/array';

type Noop = {
	operation: 'noop',
	remainingCycles: number;
}

type Addx = {
	operation: 'addx';
	remainingCycles: number;
	value: number; 
};

type Instruction = Noop | Addx;

const instructions: Instruction[] = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(instruction => {
		if (instruction.startsWith('addx')) {
			const [, value] = instruction.split(' ');
			const addx: Addx = {
				operation: 'addx',
				remainingCycles: 2,
				value: Number.parseInt(value)
			};
			return addx;
		} else {
			const noop: Noop = {
				operation: 'noop',
				remainingCycles: 1
			};
			return noop;
		}
	});

// Part 1
(() => {
	const part1Instructions = JSON.parse(JSON.stringify(instructions)) as Instruction[];
	const measuredSignalStrengths: number[] = [];
	let cycle = 1;
	let X = 1;

	while (part1Instructions.length > 0) {
		const currentInstruction = part1Instructions[0];
		currentInstruction.remainingCycles--;

		if (cycle === 20 || (cycle % 40 === 20)) {
			const signalStrength = cycle * X;
			measuredSignalStrengths.push(signalStrength);
		}

		// Finalize and clear out the current task if it's spent its required cycles
		if (currentInstruction.remainingCycles === 0) {
			if (currentInstruction.operation === 'addx') {
				X += currentInstruction.value;
			}

			part1Instructions.shift();
		}

		cycle++;
	}

	const totalMeasuredSignalStrengths = sum(measuredSignalStrengths);
	console.log(totalMeasuredSignalStrengths);
})();