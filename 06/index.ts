import fs from 'fs';

const dataStream = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('');

function allDifferent(...letters: string[]) {
	const uniqueLetters = new Set(letters);
	return uniqueLetters.size === letters.length;
}

const MARKER_SIZE = 4;
for (let i = MARKER_SIZE; i <= dataStream.length; i++) {
	const window = dataStream.slice(i - MARKER_SIZE, i);
	if (allDifferent(...window)) {
		console.log(i);
		break;
	}
}