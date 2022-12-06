import fs from 'fs';

const dataStream = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('');

function allDifferent(...letters: string[]) {
	const uniqueLetters = new Set(letters);
	return uniqueLetters.size === letters.length;
}

// Part 1
const MARKER_SIZE = 4;
for (let i = MARKER_SIZE; i <= dataStream.length; i++) {
	const window = dataStream.slice(i - MARKER_SIZE, i);
	if (allDifferent(...window)) {
		console.log(i);
		break;
	}
}

// Part 2
const MESSAGE_SIZE = 14;
for (let i = MESSAGE_SIZE; i <= dataStream.length; i++) {
	const window = dataStream.slice(i - MESSAGE_SIZE, i);
	if (allDifferent(...window)) {
		console.log(i);
		break;
	}
}