const fs = require('fs');
const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n');

/** @type {number[][]} */
const elves = lines.reduce((elves, line) => {
	let currentElfIndex = elves.length - 1;
	let currentElf = elves[currentElfIndex];

	if (line === '') {
		currentElf = [];
		elves.push(currentElf);
	} else {
		const calories = Number.parseInt(line);
		currentElf.push(calories);
	}

	return elves;
}, [[]]);

// Part 1
function sum(arr) {
	return arr.reduce((total, addend) => (total + addend), 0);
}

const totalCalories = elves.map(sum);
const maxCalories = Math.max(...totalCalories);

console.log(maxCalories);