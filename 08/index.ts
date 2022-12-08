import fs from 'fs';

const treeHeights = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => {
		const heightStrings = line.split('');
		return heightStrings.map(height => Number.parseInt(height));
	});

// Part 1

/**
 * Determine whether the provided coordinate is on the edge of the grid
 */
function isEdge(row: number, col: number) {
	return (
		row === 0 ||
		col === 0 ||
		row === treeHeights.length - 1 ||
		col === treeHeights[row].length - 1
	);
}

/**
 * Determines whether a provided tree can be seen from any edge, either because it's on
 * the edge directly, or because any trees between it and the edge are shorter.
 * @returns true if there are no taller/equal height trees between this tree and the edge
 */
function isVisible(treeRow: number, treeCol: number) {
	if (isEdge(treeRow, treeCol)) {
		return true;
	}

	const currentHeight = treeHeights[treeRow][treeCol];

	const heightsFromTop: number[] = [];
	for (let r = 0; r < treeRow; r++) {
		heightsFromTop.push(treeHeights[r][treeCol]);
	}
	const visibleFromTop = heightsFromTop.every(height => height < currentHeight);
	if (visibleFromTop) {
		return true;
	}
	
	const heightsFromBottom: number[] = [];
	for (let r = treeRow + 1; r < treeHeights.length; r++) {
		heightsFromBottom.push(treeHeights[r][treeCol]);
	}
	const visibleFromBottom = heightsFromBottom.every(height => height < currentHeight);
	if (visibleFromBottom) {
		return true;
	}

	const heightsFromLeft: number[] = [];
	for (let c = 0; c < treeCol; c++) {
		heightsFromLeft.push(treeHeights[treeRow][c]);
	}
	const visibleFromLeft = heightsFromLeft.every(height => height < currentHeight);
	if (visibleFromLeft) {
		return true;
	}

	const heightsFromRight: number[] = [];
	for (let c = treeCol + 1; c < treeHeights[treeRow].length; c++) {
		heightsFromRight.push(treeHeights[treeRow][c]);
	}
	const visibleFromRight = heightsFromRight.every(height => height < currentHeight);
	if (visibleFromRight) {
		return true;
	}

	return false;
}

let visibleTrees = 0;
for (let row = 0; row < treeHeights.length; row++) {
	for (let col = 0; col < treeHeights[0].length; col++) {
		if (isVisible(row, col)) {
			visibleTrees++;
		}
	}
}

console.log(visibleTrees);

// Part 2

/**
 * Gets the product of all viewing distances from the current tree to the edge
 * or another tree of equal or greater height.
 * @returns the product of all viewing distances
 */
function getScenicScore(currentRow: number, currentCol: number) {
	if (isEdge(currentRow, currentCol)) {
		return 0;
	}

	const currentHeight = treeHeights[currentRow][currentCol];

	let scenicDistanceToTop = 0;
	let scenicDistanceToBottom = 0;
	let scenicDistanceToLeft = 0;
	let scenicDistanceToRight = 0;

	for (let r = currentRow - 1; r >= 0; r--) {
		scenicDistanceToTop++;
		if (treeHeights[r][currentCol] >= currentHeight) {
			break;
		}
	}

	for (let r = currentRow + 1; r < treeHeights.length; r++) {
		scenicDistanceToBottom++;
		if (treeHeights[r][currentCol] >= currentHeight) {
			break;
		}
	}

	for (let c = currentCol - 1; c >= 0; c--) {
		scenicDistanceToLeft++;
		if (treeHeights[currentRow][c] >= currentHeight) {
			break;
		}
	}

	for (let c = currentCol + 1; c < treeHeights[currentRow].length; c++) {
		scenicDistanceToRight++;
		if (treeHeights[currentRow][c] >= currentHeight) {
			break;
		}
	}

	const scenicScore = scenicDistanceToTop * scenicDistanceToBottom * scenicDistanceToLeft * scenicDistanceToRight;

	return scenicScore;
}

let maxScenicScore = 0;
for (let r = 0; r < treeHeights.length; r++) {
	for (let c = 0; c < treeHeights[r].length; c++) {
		const scenicScore = getScenicScore(r, c);
		maxScenicScore = Math.max(maxScenicScore, scenicScore);
	}
}
console.log(maxScenicScore);