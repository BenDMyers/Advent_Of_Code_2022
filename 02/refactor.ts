import fs from 'fs';

type Move = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'tie';
type OpponentInput = 'A' | 'B' | 'C';
type SecondInput = 'X' | 'Y' | 'Z';

const rounds = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(line => (line.split(' ') as [OpponentInput, SecondInput]));

const winningMoves: {[key in Move]: Move} = {
	rock: 'paper',
	paper: 'scissors',
	scissors: 'rock'
};

const losingMoves: {[key in Move]: Move} = {
	rock: 'scissors',
	paper: 'rock',
	scissors: 'paper'
};

const opponentInputToMove: {[key in OpponentInput]: Move} = {
	A: 'rock',
	B: 'paper',
	C: 'scissors'
};

const pointsForMove: {[key in Move]: number} = {
	rock: 1,
	paper: 2,
	scissors: 3
}

const pointsForOutcome: {[key in Outcome]: number} = {
	lose: 0,
	tie: 3,
	win: 6
};

// Part 1
const secondInputToMove: {[key in SecondInput]: Move} = {
	X: 'rock',
	Y: 'paper',
	Z: 'scissors'
}

let part1Score = 0;
for (const [opponentInput, secondInput] of rounds) {
	const opponentMove = opponentInputToMove[opponentInput];
	const myMove = secondInputToMove[secondInput];

	let outcome: Outcome = 'lose';
	if (opponentMove === myMove) {
		outcome = 'tie';
	} else if (winningMoves[opponentMove] === myMove) {
		outcome = 'win';
	}

	let points = pointsForOutcome[outcome] + pointsForMove[myMove];
	part1Score += points;
}

console.log(part1Score);

// Part 2
const secondInputToOutcome: {[key in SecondInput]: Outcome} = {
	X: 'lose',
	Y: 'tie',
	Z: 'win'
};

let part2Score = 0;
for (const [opponentInput, secondInput] of rounds) {
	const opponentMove = opponentInputToMove[opponentInput];
	const outcome = secondInputToOutcome[secondInput];

	let myMove: Move;
	if (outcome === 'tie') {
		myMove = opponentMove;
	} else if (outcome === 'win') {
		myMove = winningMoves[opponentMove];
	} else {
		myMove = losingMoves[opponentMove];
	}

	let points = pointsForOutcome[outcome] + pointsForMove[myMove];
	part2Score += points;
}

console.log(part2Score);