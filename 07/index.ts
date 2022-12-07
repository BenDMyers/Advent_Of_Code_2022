import fs from 'fs';

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n');

type Directory = {
	name: string;
	files: {[key: string]: number};
	subdirectories: {[key: string]: Directory};
	parent?: Directory
	totalSize?: number;
};

// Parse commands and their outputs
const root: Directory = {
	name: '/',
	files: {},
	subdirectories: {}
};

const allDirectories: Directory[] = [root];
let workingDirectory = root;

/**
 * Adjusts the relative working directory.
 *   - `..` moves to the parent
 *   - `/` moves to the root
 *   - Anything else moves to the subdirectory with the given name
 * @param newDirectory name of new directory, or ".." or "/"
 */
function changeDirectory(newDirectory: string) {
	if (newDirectory === '/') {
		workingDirectory = root;
	} else if (newDirectory === '..') {
		if (!!workingDirectory.parent) {
			workingDirectory = workingDirectory.parent;
		}
	} else {
		const subdirectory = workingDirectory.subdirectories[newDirectory];
		if (subdirectory) {
			workingDirectory = subdirectory;
		}
	}
}

/**
 * Save details about files and subdirectories contained in the current working directory.
 * A detail of the format "[number] [filename]" indicates a file exists in the current working 
 * directory with that given name which has a size with that given number.
 * A detail of the format "dir [dirname]" indicates a subdirectory exists in the working
 * directory with the provided name.
 * @param contentDetails list of file sizes or directories
 */
function listDirectory(contentDetails: string[]) {
	for (const detail of contentDetails) {
		if (detail.startsWith('dir')) {
			const [, directoryName] = detail.split(' ');
			const subdirectory: Directory = {
				name: directoryName,
				files: {},
				subdirectories: {},
				parent: workingDirectory
			};
			allDirectories.push(subdirectory);
			workingDirectory.subdirectories[directoryName] = subdirectory;
		} else {
			const [fileSizeString, filename] = detail.split(' ');
			const fileSize = Number.parseInt(fileSizeString);
			workingDirectory.files[filename] = fileSize;
		}
	}
}

do {
	// Thanks to the `while` check, we know there will be an instruction here - but TypeScript doesn't!
	const instruction = lines.shift() || '';

	if (instruction.startsWith('$')) {
		const [_dollar, command, arg] = instruction.split(' ');
		if (command === 'cd') {
			changeDirectory(arg);
		} else if (command === 'ls') {
			const directoryContents: string[] = [];
			while (lines.length > 0 && !lines[0].startsWith('$')) {
				const detail = lines.shift() || '';
				if (detail) {
					directoryContents.push(detail);
				}
			}
			listDirectory(directoryContents);
		}
	}
} while (lines.length);

// Part 1

/**
 * Recursively determines the total size of the provided directory
 * @param directory the directory to get the size of
 * @returns sum of all file sizes and subdirectory sizes within the provided directory
 */
function getDirectorySize(directory: Directory): number {
	if (directory.totalSize) {
		return directory.totalSize;
	}

	const totalFileSizes = Object.values(directory.files)
		.reduce((totalSize, fileSize) => {
			return totalSize + fileSize;
		}, 0);

	const totalSubdirectorySizes = Object.values(directory.subdirectories)
		.reduce((totalSize, subdirectory) => {
			return totalSize + getDirectorySize(subdirectory);
		}, 0);

	const totalSize = totalFileSizes + totalSubdirectorySizes;
	directory.totalSize = totalSize;
	return totalSize;
}

const MAX_DIRECTORY_SIZE = 100_000;

// /**
//  * Determines all directories smaller than the max size
//  * @param rootDirectory top level directory to begin ch
//  * @returns list of all directories smaller than the max size
//  */
// function findDirectoriesUnderLimit(rootDirectory: Directory): Directory[] {
// 	const directoriesUnderLimit: Directory[] = [];
// 	if (getDirectorySize(rootDirectory) <= MAX_DIRECTORY_SIZE) {
// 		directoriesUnderLimit.push(rootDirectory);
// 	}
// 	Object.values(rootDirectory.subdirectories)
// 		.forEach(subdirectory => {
// 			const nestedDirectoriesUnderLimit = findDirectoriesUnderLimit(subdirectory);
// 			directoriesUnderLimit.push(...nestedDirectoriesUnderLimit);
// 		});
// 	return directoriesUnderLimit;
// }

// const directoriesUnderLimit = findDirectoriesUnderLimit(root);

const directoriesUnderLimit = allDirectories.filter(directory => getDirectorySize(directory) <= MAX_DIRECTORY_SIZE);

const totalSizeOfDirectoriesUnderLimit = directoriesUnderLimit
	.reduce((totalSize, directory) => {
		return totalSize + getDirectorySize(directory);
	}, 0);
console.log(totalSizeOfDirectoriesUnderLimit);

// Part 2
const MAX_DISK_SPACE = 70_000_000;
const REQUIRED_UNUSED_SPACE = 30_000_000;
const currentUsedSpace = getDirectorySize(root);

/**
 * Sorter function for sorting a list of directories by their total size, in descending order
 * @returns negative if a's size is smaller than b (so b should go first), positive if a's size is larger than b (so a should go first), or 0 if they have the same size
 */
 function byDirectorySize(a: Directory, b: Directory) {
	return getDirectorySize(a) - getDirectorySize(b);
}


const largeEnoughDirectories = allDirectories
	.filter(directory => currentUsedSpace - getDirectorySize(directory) <= (MAX_DISK_SPACE - REQUIRED_UNUSED_SPACE));
largeEnoughDirectories.sort(byDirectorySize);
const [smallestSufficientDirectory] = largeEnoughDirectories;
console.log(getDirectorySize(smallestSufficientDirectory));