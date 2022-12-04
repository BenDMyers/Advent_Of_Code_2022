import fs from 'fs';

type Range = {start: number; end: number;}

const pairs = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => {
		const [
			firstRangeStart,
			firstRangeEnd,
			secondRangeStart,
			secondRangeEnd
		] = line.split(/[,-]/g);

		const firstRange = {
			start: Number.parseInt(firstRangeStart),
			end: Number.parseInt(firstRangeEnd)
		} as Range;

		const secondRange = {
			start: Number.parseInt(secondRangeStart),
			end: Number.parseInt(secondRangeEnd)
		} as Range;

		return [firstRange, secondRange];
	});

// Part 1
function isFullyContained(outerRange: Range, innerRange: Range) {
	const innerStartsAfterOuter = outerRange.start <= innerRange.start;
	const innerEndsBeforeOuter = outerRange.end >= innerRange.end;
	return innerStartsAfterOuter && innerEndsBeforeOuter;
}

let part1Total = 0;
for (const [first, second] of pairs) {
	if (isFullyContained(first, second) || isFullyContained(second, first)) {
		part1Total++;
	}
}
console.log(part1Total);