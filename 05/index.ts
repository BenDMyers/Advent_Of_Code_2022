import fs from 'fs';
import { chunk } from '../utils/array';

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n');

const emptyLineIndex = lines.indexOf('');
const crateNumbersIndex = emptyLineIndex - 1;
const instructionsIndex = emptyLineIndex + 1;
const crateLines = lines.slice(0, crateNumbersIndex);
const instructionLines = lines.slice(instructionsIndex);

// Parse provided crate stacks
const stacks: {[key: string]: string[]} = {};
const crateRowsBottomFirst = [...crateLines].reverse();
for (const row of crateRowsBottomFirst) {
	// Every crate is four characters (left bracket, letter, right bracket, space)
	const cratesInRow = chunk(row.split(''), 4)
		.map(characters => characters.filter(char => /\w/.test(char))) // filter out brackets and spaces - now items are empty array if no crate in this part of the stack, or [letter] if there is
	cratesInRow.forEach((letters, stackIndex) => {
		if (letters.length > 0) {
			const [crateName] = letters;
			if (!stacks[stackIndex + 1]) {
				stacks[stackIndex + 1] = [] as string[];
			}
			stacks[stackIndex + 1].push(crateName);
		}
	});
}

// Parse provided instructions
// type Instruction = {amount: number; from: number; to: number;}
for (const instructionLine of instructionLines) {
	const [, amountString, , fromString, , toString] = instructionLine.split(' ');
	const amount = Number.parseInt(amountString);
	const from = Number.parseInt(fromString);
	const to = Number.parseInt(toString);

	for (let i = 0; i < amount; i++) {
		const topCrate = stacks[from].pop();
		topCrate && stacks[to].push(topCrate);
	}
}

let topCrates = '';
for (const stack of Object.values(stacks)) {
	if (stack.length) {
		topCrates += stack[stack.length - 1];
	}
}
console.log(topCrates);