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
const initialStacks: {[key: string]: string[]} = {};
const crateRowsBottomFirst = [...crateLines].reverse();
for (const row of crateRowsBottomFirst) {
	// Every crate is four characters (left bracket, letter, right bracket, space)
	const cratesInRow = chunk(row.split(''), 4)
		.map(characters => characters.filter(char => /\w/.test(char))) // filter out brackets and spaces - now items are empty array if no crate in this part of the stack, or [letter] if there is
	cratesInRow.forEach((letters, stackIndex) => {
		if (letters.length > 0) {
			const [crateName] = letters;
			if (!initialStacks[stackIndex + 1]) {
				initialStacks[stackIndex + 1] = [] as string[];
			}
			initialStacks[stackIndex + 1].push(crateName);
		}
	});
}

// Part 1
const part1Stacks: {[key: string]: string[]} = JSON.parse(JSON.stringify(initialStacks));
for (const instructionLine of instructionLines) {
	const [, amountString, , fromString, , toString] = instructionLine.split(' ');
	const amount = Number.parseInt(amountString);
	const from = Number.parseInt(fromString);
	const to = Number.parseInt(toString);

	for (let i = 0; i < amount; i++) {
		const topCrate = part1Stacks[from].pop();
		topCrate && part1Stacks[to].push(topCrate);
	}
}

let part1TopCrates = '';
for (const stack of Object.values(part1Stacks)) {
	if (stack.length) {
		part1TopCrates += stack[stack.length - 1];
	}
}
console.log(part1TopCrates);

// Part 2
const part2Stacks: {[key: string]: string[]} = JSON.parse(JSON.stringify(initialStacks));
for (const instructionLine of instructionLines) {
	const [, amountString, , fromString, , toString] = instructionLine.split(' ');
	const amount = Number.parseInt(amountString);
	const from = Number.parseInt(fromString);
	const to = Number.parseInt(toString);

	const indexOfBottomLiftedCrate = part2Stacks[from].length - amount;
	const liftedCrates = part2Stacks[from].slice(indexOfBottomLiftedCrate);
	part2Stacks[from] = part2Stacks[from].slice(0, indexOfBottomLiftedCrate);
	part2Stacks[to].push(...liftedCrates);
}

let part2TopCrates = '';
for (const stack of Object.values(part2Stacks)) {
	if (stack.length) {
		part2TopCrates += stack[stack.length - 1];
	}
}
console.log(part2TopCrates);