import fs from 'fs';

const treeHeights = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => {
		const heightStrings = line.split('');
		return heightStrings.map(height => Number.parseInt(height));
	});

console.log(treeHeights)

// Part 1
function isEdge(row: number, col: number) {
	return (
		row === 0 ||
		col === 0 ||
		row === treeHeights.length - 1 ||
		col === treeHeights[row].length - 1
	);
}

function isVisible(treeRow: number, treeCol: number) {
	if (isEdge(treeRow, treeCol)) {
		return true;
	}

	const currentHeight = treeHeights[treeRow][treeCol];

	const heightsFromTop: number[] = [];
	const heightsFromBottom: number[] = [];
	const heightsFromLeft: number[] = [];
	const heightsFromRight: number[] = [];

	for (let r = 0; r < treeRow; r++) {
		heightsFromTop.push(treeHeights[r][treeCol]);
	}

	const visibleFromTop = heightsFromTop.every(height => height < currentHeight);
	if (visibleFromTop) {
		return true;
	}
	
	for (let r = treeRow + 1; r < treeHeights.length; r++) {
		heightsFromBottom.push(treeHeights[r][treeCol]);
	}

	const visibleFromBottom = heightsFromBottom.every(height => height < currentHeight);
	if (visibleFromBottom) {
		return true;
	}

	for (let c = 0; c < treeCol; c++) {
		heightsFromLeft.push(treeHeights[treeRow][c]);
	}

	const visibleFromLeft = heightsFromLeft.every(height => height < currentHeight);
	if (visibleFromLeft) {
		return true;
	}

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
	let visibleRow = '';
	for (let col = 0; col < treeHeights[0].length; col++) {
		// console.log({row, col})
		if (isVisible(row, col)) {
			const height = treeHeights[row][col].toString();
			visibleRow += height;
			visibleTrees++;
		} else {
			visibleRow += ' ';
		}
	}
	console.log(visibleRow);
}

console.log(visibleTrees);