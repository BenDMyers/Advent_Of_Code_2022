import fs from 'fs';
import { chunk } from '../utils/array';
import { intersection } from '../utils/set';

const rucksacks = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')

// Part 1
function getPriority(letter: string) {
	return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1;
}

const compartmentalizedRucksacks = rucksacks.map(rucksack => {
	const midpoint = rucksack.length / 2;
	const firstCompartment = rucksack.substring(0, midpoint);
	const secondCompartment = rucksack.substring(midpoint);
	return [firstCompartment, secondCompartment];
});

let part1Total = 0;
for (const [firstCompartment, secondCompartment] of compartmentalizedRucksacks) {
	const firstCompartmentItems = firstCompartment.split('');
	const secondCompartmentItems = secondCompartment.split('');
	const rucksackErrors = intersection(firstCompartmentItems, secondCompartmentItems);

	rucksackErrors.forEach(error => {
		const priority = getPriority(error);
		part1Total += priority;
	});
}

console.log(part1Total);

// Part 2
const elfTriads = chunk(rucksacks, 3);

let part2Total = 0;
elfTriads.forEach(triad => {
	const rucksackItems = triad.map(rucksack => rucksack.split(''));
	const itemsInCommon = intersection(...rucksackItems);
	for (const item of itemsInCommon) {
		part2Total += getPriority(item);
	}
});

console.log(part2Total);