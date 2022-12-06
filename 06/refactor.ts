import fs from 'fs';

const dataStream = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('');

/**
 * Determine whether each character in a list is unique
 * @param letters list of characters
 * @returns whether every character provided is unique
 */
function isAllUnique(...letters: string[]) {
	const uniqueLetters = new Set(letters);
	return uniqueLetters.size === letters.length;
}


/**
 * Determines at which point in the provided list the last few characters are all unique.
 * @param dataStream list of characters
 * @param windowSize how many characters must be unique in a row
 * @returns index after first window within the list where every character is unique
 */
function findFirstUniqueWindow(dataStream: string[], windowSize: number) {
	for (let i = windowSize; i <= dataStream.length; i++) {
		const window = dataStream.slice(i - windowSize, i);
		if (isAllUnique(...window)) {
			return i;
		}
	}

	return -1;
}

// Part 1
console.log(findFirstUniqueWindow(dataStream, 4));
// Part 2
console.log(findFirstUniqueWindow(dataStream, 14));