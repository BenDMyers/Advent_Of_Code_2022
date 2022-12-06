import fs from 'fs';

const dataStream = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('');

function allDifferent(...letters: string[]) {
	const uniqueLetters = new Set(letters);
	return uniqueLetters.size === letters.length;
}

function findFirstUniqueWindow(dataStream: string[], windowSize: number) {
	for (let i = windowSize; i <= dataStream.length; i++) {
		const window = dataStream.slice(i - windowSize, i);
		if (allDifferent(...window)) {
			console.log(i);
			break;
		}
	}
}

// Part 1
findFirstUniqueWindow(dataStream, 4);
// Part 2
findFirstUniqueWindow(dataStream, 14);