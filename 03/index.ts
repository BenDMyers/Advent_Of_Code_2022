import fs from 'fs';

const rucksacks = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')

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

const compartmentalizedRucksacks = rucksacks.map(rucksack => {
	const midpoint = rucksack.length / 2;
	const firstCompartment = rucksack.substring(0, midpoint);
	const secondCompartment = rucksack.substring(midpoint);
	return [firstCompartment, secondCompartment];
});

let part1Total = 0;
for (const [firstCompartment, secondCompartment] of compartmentalizedRucksacks) {
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

// Part 2
const elfTriads = rucksacks.reduce((triads, elf, index) => {
	const currentTriad = triads[triads.length - 1];
	currentTriad?.push(elf);

	if (currentTriad?.length === 3 && index < rucksacks.length - 1) {
		triads.push(new Array<string>());
	}

	return triads;
}, [new Array<string>()]);

function generalizedIntersection(...lists: string[][]) {
	const [firstSet, ...remainingSets] = lists.map(list => new Set(list));
	const intersection = new Set<string>();

	for (let item of firstSet) {
		if (remainingSets.every(set => set.has(item))) {
			intersection.add(item);
		}
	}

	return [...intersection];
}

let part2Total = 0;
elfTriads.forEach(triad => {
	const rucksackItems = triad.map(rucksack => rucksack.split(''));
	const itemsInCommon = generalizedIntersection(...rucksackItems);
	for (const item of itemsInCommon) {
		part2Total += getPriority(item);
	}
});

console.log(part2Total);