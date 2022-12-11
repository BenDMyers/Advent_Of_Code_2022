import fs from 'fs';
import { chunk } from '../utils/array';

type Monkey = {
	itemWorryLevels: number[];
	operation: string;
	testDivisor: number;
	throwToOnTrue: number;
	throwToOnFalse: number;
	itemsInspected: number;
};

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.filter(x => x.length);

const monkeyDefinitions = chunk(lines, 6);

const monkeys: Monkey[] = [];
for (const monkeyDefinition of monkeyDefinitions) {
	const [
		_monkeyId,
		startingItemsLine,
		operationLine,
		testLine,
		trueLine,
		falseLine
	] = monkeyDefinition;

	const [, startingItemsList] = startingItemsLine.split(': ');
	const startingItems = startingItemsList
		.split(', ')
		.map(worryLevelString => Number.parseInt(worryLevelString));

	const [, operation] = operationLine.split('= ');

	const [, testDivisorStr] = testLine.split('by ');
	const testDivisor = Number.parseInt(testDivisorStr);
	
	const [, trueRecipientMonkeyStr] = trueLine.split('monkey ');
	const throwToOnTrue = Number.parseInt(trueRecipientMonkeyStr);

	const [, falseRecipientMonkeyStr] = falseLine.split('monkey ');
	const throwToOnFalse = Number.parseInt(falseRecipientMonkeyStr);

	const monkey: Monkey = {
		itemWorryLevels: startingItems,
		operation,
		testDivisor,
		throwToOnTrue,
		throwToOnFalse,
		itemsInspected: 0
	};
	monkeys.push(monkey);
}

function byItemsInspected(monkeyA: Monkey, monkeyB: Monkey) {
	return monkeyB.itemsInspected - monkeyA.itemsInspected;
}

// Part 1
(() => {
	const part1Monkeys = JSON.parse(JSON.stringify(monkeys)) as Monkey[];

	for (let round = 0; round < 20; round++) {
		for (const monkey of part1Monkeys) {
			while (monkey.itemWorryLevels.length > 0) {
				let itemWorryLevel = monkey.itemWorryLevels.shift();
				if (itemWorryLevel === undefined) {
					return;
				}
				const operation = monkey.operation.replace(/old/g, itemWorryLevel.toString());
				itemWorryLevel = eval(operation) as number;
				itemWorryLevel = Math.floor(itemWorryLevel / 3);
				const recipientMonkeyId = (itemWorryLevel % monkey.testDivisor === 0) ?
					monkey.throwToOnTrue : monkey.throwToOnFalse;
				const recipientMonkey = part1Monkeys[recipientMonkeyId];
				recipientMonkey.itemWorryLevels.push(itemWorryLevel);
				monkey.itemsInspected++;
			}
		}
	}

	part1Monkeys.sort(byItemsInspected);
	const [busiest, secondBusiest] = part1Monkeys;
	const monkeyBusiness = busiest.itemsInspected * secondBusiest.itemsInspected;
	console.log(monkeyBusiness);
})();