import fs from 'fs';

const rucksacks = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(rucksack => {
		const midpoint = rucksack.length / 2;
		const firstCompartment = rucksack.substring(0, midpoint);
		const secondCompartment = rucksack.substring(midpoint);
		return [firstCompartment, secondCompartment];
	});

// Part 1
function intersection(firstCompartment: string[], secondCompartment: string[]) {
	const set1 = new Set(firstCompartment);
	const set2 = new Set(secondCompartment);
	const setIntersection = new Set<string>();

	for (const inSet1 of set1) {
		if (set2.has(inSet1)) {
			setIntersection.add(inSet1);
		}
	}

	return setIntersection;
}

function getPriority(letter: string) {
	return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1;
}

let part1Total = 0;
for (const [firstCompartment, secondCompartment] of rucksacks) {
	const rucksackErrors = intersection(
		firstCompartment.split(''),
		secondCompartment.split('')
	);

	rucksackErrors.forEach(error => {
		const priority = getPriority(error);
		part1Total += priority;
	});
}

console.log(part1Total);