/**
 * Splits a given array into chunks of a given size
 * @param array list to split
 * @param chunkSize maximum size of each chunk
 * @returns array of arrays, where the nested arrays don't exceed `chunkSize` in length
 */
export function chunk<T>(array: T[], chunkSize: number) {
	const chunks = new Array<T[]>([]);

	for (const item of array) {
		let currentChunk = chunks[chunks.length - 1];
		if (currentChunk.length === chunkSize) {
			currentChunk = new Array<T>();
			chunks.push(currentChunk);
		}
		
		currentChunk.push(item);
	}

	return chunks;
}

export function sum(arr: number[]) {
	let total = 0;
	for (const num of arr) {
		total += num;
	}
	return total;
}