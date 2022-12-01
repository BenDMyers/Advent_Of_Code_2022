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

// Part 2
function byCalories(elfA, elfB) {
	return elfB - elfA;
}

const elvesByCalories = [...totalCalories].sort(byCalories);
const [first, second, third] = elvesByCalories;
console.log(first + second + third);