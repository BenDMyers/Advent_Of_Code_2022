import fs from 'fs';

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => line.split(' '));

// Part 1
type OpponentMove = 'A' | 'B' | 'C';
type MyMove = 'X' | 'Y' | 'Z';
type GameState = 'opponentWins' | 'iWin' | 'tie';

const equivalentMoves: {[key in OpponentMove]: MyMove} = {
	A: 'X',
	B: 'Y',
	C: 'Z'
}

const winningMoves: {[key in OpponentMove]: MyMove} = {
	A: 'Y',
	B: 'Z',
	C: 'X'
};

const gameStatePoints: {[key in GameState]: number} = {
	opponentWins: 0,
	tie: 3,
	iWin: 6
};

const moveBasedPoints: {[key in MyMove]: number} = {
	X: 1,
	Y: 2,
	Z: 3
};

let part1Score = 0;
for (let match of lines) {
	const [opponentMove, myMove] = match;

	let gameState: GameState = 'opponentWins';
	if (equivalentMoves[(opponentMove as OpponentMove)] === myMove) {
		gameState = 'tie';
	} else if (winningMoves[(opponentMove as OpponentMove)] === myMove) {
		gameState = 'iWin';
	}

	const matchPoints = gameStatePoints[gameState] + moveBasedPoints[(myMove as MyMove)];
	part1Score += matchPoints;
}

console.log(part1Score);

// Part 2
const losingMoves: {[key in OpponentMove]: MyMove} = {
	A: 'Z',
	B: 'X',
	C: 'Y'
};

const strategies: {[key in 'X' | 'Y' | 'Z']: GameState} = {
	X: 'opponentWins',
	Y: 'tie',
	Z: 'iWin'
}

let part2Score = 0;
for (let match of lines) {
	const [opponentMove, strategy] = match;
	const targetedGameState = strategies[(strategy as 'X' | 'Y' | 'Z')];

	let myMove: MyMove;

	if (targetedGameState === 'tie') {
		myMove = equivalentMoves[(opponentMove as OpponentMove)];
	} else if (targetedGameState === 'opponentWins') {
		myMove = losingMoves[(opponentMove as OpponentMove)];
	} else {
		myMove = winningMoves[(opponentMove as OpponentMove)];
	}

	const matchPoints = gameStatePoints[targetedGameState] + moveBasedPoints[myMove];
	part2Score += matchPoints;
}

console.log(part2Score);