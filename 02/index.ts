import fs from 'fs';

const lines = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => line.split(' '));

// Part 1
// enum OpponentMoves {
// 	rock = 'A',
// 	paper = 'B',
// 	scissors = 'C'
// }

// enum MyMoves {
// 	rock = 'X',
// 	paper = 'Y',
// 	scissors = 'Z'
// };

// const equivalentMoves = {
// 	[OpponentMoves.rock]: MyMoves.rock,
// 	[OpponentMoves.paper]: MyMoves.paper,
// 	[OpponentMoves.scissors]: MyMoves.scissors,
// };

// const winningMoves = {
// 	[OpponentMoves.rock]: MyMoves.paper,
// 	[OpponentMoves.paper]: MyMoves.scissors,
// 	[OpponentMoves.scissors]: MyMoves.rock,
// };

// const moveScores = {
// 	[MyMoves.rock]: 1,
// 	[MyMoves.paper]: 2,
// 	[MyMoves.scissors]: 3,
// };

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

let score = 0;
for (let match of lines) {
	const [opponentMove, myMove] = match;

	let gameState: GameState = 'opponentWins';
	if (equivalentMoves[(opponentMove as OpponentMove)] === myMove) {
		gameState = 'tie';
	} else if (winningMoves[(opponentMove as OpponentMove)] === myMove) {
		gameState = 'iWin';
	}

	const matchPoints = gameStatePoints[gameState] + moveBasedPoints[(myMove as MyMove)];
	score += matchPoints;
}

console.log(score);