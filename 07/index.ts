import fs from 'fs';

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n');


type File = {
	filename: string;
	size: number;
};

type Directory = {
	name: string;
	files: {[key: string]: number};
	subdirectories: {[key: string]: Directory};
	parent?: Directory
};

// Parse commands and their outputs
const root: Directory = {
	name: '/',
	files: {},
	subdirectories: {}
};

let workingDirectory = root;

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
			workingDirectory.subdirectories[directoryName] = subdirectory;
		} else {
			const [fileSizeString, filename] = detail.split(' ');
			const fileSize = Number.parseInt(fileSizeString);
			workingDirectory.files[filename] = fileSize;
		}
	}
}

do {
	const instruction = lines.shift() || '';
	// console.log(instruction)
	if (instruction.startsWith('$')) {
		const [_dollar, command, arg] = instruction.split(' ');
		if (command === 'cd') {
			changeDirectory(arg);
			// console.log({cd: workingDirectory});
		} else if (command === 'ls') {
			const directoryContents: string[] = [];
			while (lines.length > 0 && !lines[0].startsWith('$')) {
				const detail = lines.shift() || '';
				// console.log({detail})
				if (detail) {
					directoryContents.push(detail);
				}
			}
			// console.log({ls: directoryContents})
			listDirectory(directoryContents);
		}
	}
} while (lines.length);

// console.dir(root, {depth: 10})

// Part 1
function getDirectorySize(directory: Directory): number {
	const totalFileSizes = Object.values(directory.files)
		.reduce((totalSize, fileSize) => {
			return totalSize + fileSize;
		}, 0);

	const totalSubdirectorySizes = Object.values(directory.subdirectories)
		.reduce((totalSize, subdirectory) => {
			return totalSize + getDirectorySize(subdirectory);
		}, 0);

	return totalFileSizes + totalSubdirectorySizes;
}

const MAX_DIRECTORY_SIZE = 100_000;
function findDirectoriesUnderLimit(rootDirectory: Directory): Directory[] {
	const directoriesUnderLimit: Directory[] = [];
	if (getDirectorySize(rootDirectory) <= MAX_DIRECTORY_SIZE) {
		directoriesUnderLimit.push(rootDirectory);
	}
	Object.values(rootDirectory.subdirectories)
		.forEach(subdirectory => {
			const nestedDirectoriesUnderLimit = findDirectoriesUnderLimit(subdirectory);
			directoriesUnderLimit.push(...nestedDirectoriesUnderLimit);
		});
	return directoriesUnderLimit;
}

const directoriesUnderLimit = findDirectoriesUnderLimit(root);
const totalSizeOfDirectoriesUnderLimit = directoriesUnderLimit
	.reduce((totalSize, directory) => {
		return totalSize + getDirectorySize(directory);
	}, 0);
console.log(directoriesUnderLimit);
console.log(totalSizeOfDirectoriesUnderLimit);