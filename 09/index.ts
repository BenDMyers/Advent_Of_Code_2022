import fs from 'fs';
import { getHypotenuseLength } from '../utils/pythagorean-theorem';

type Direction = 'U' | 'D' | 'L' | 'R';

type Instruction = {
	direction: Direction;
	amount: number;
};

type Coordinates = {x: number, y: number};

const instructions: Instruction[] = fs
	.readFileSync(`${__dirname}/.input`, 'utf-8')
	.split('\n')
	.map(instr => {
		const [direction, amount] = instr.split(' ');
		return {
			direction: (direction as Direction),
			amount: Number.parseInt(amount)
		};
	});

// Part 1
(() => {
	const head: Coordinates = {x: 0, y: 0};
	const tail: Coordinates = {x: 0, y: 0};
	const tailVisits = new Set(
		[JSON.stringify(tail)]
	);

	for (const {direction, amount} of instructions) {
		for (let i = 0; i < amount; i++) {
			if (direction === 'D') {
				head.y--;
			} else if (direction === 'U') {
				head.y++;
			} else if (direction === 'L') {
				head.x--;
			} else if (direction === 'R') {
				head.x++;
			}
		
			const horizontalDistance = head.x - tail.x;
			const verticalDistance = head.y - tail.y;
			const distance = getHypotenuseLength(horizontalDistance, verticalDistance);
		
			// If distance = 0 (overlapping), 1 (horiz/vert adjacent), or √1
			// (diagonally adjacent), then don't move the tail. Tail only
			// moves if distance >= 2
			if (distance >= 2) {
				if (horizontalDistance < 0) {
					// Negative horizontal distance means head is left of tail
					tail.x--;
				} else if (horizontalDistance > 0) {
					// Positive horizontal distance means head is right of tail
					tail.x++;
				}
		
				if (verticalDistance < 0) {
					// Negative vertical distance means head is below tail
					tail.y--;
				} else if (verticalDistance > 0) {
					// Positive vertical distance means head is above tail
					tail.y++;
				}
		
				tailVisits.add(JSON.stringify(tail));
			}
		}
	}

	console.log(tailVisits.size);
})();

// Part 2
(() => {
	const knots: Coordinates[] = [];
	const numKnots = 10;
	for (let i = 0; i < numKnots; i++) {
		const knot: Coordinates = {x: 0, y: 0};
		knots.push(knot);
	}
	const head = knots[0];
	const tail = knots[knots.length - 1];
	const tailVisits = new Set(
		[JSON.stringify(tail)]
	);

	for (let {direction, amount} of instructions) {
		step:
		for (let step = 0; step < amount; step++) {
			if (direction === 'D') {
				head.y--;
			} else if (direction === 'U') {
				head.y++;
			} else if (direction === 'L') {
				head.x--;
			} else if (direction === 'R') {
				head.x++;
			}

			knots:
			for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
				const knot = knots[knotIndex];
				const previousKnot = knots[knotIndex - 1];

				const horizontalDistance = previousKnot.x - knot.x;
				const verticalDistance = previousKnot.y - knot.y;
				const distance = getHypotenuseLength(horizontalDistance, verticalDistance);
			
				// If distance = 0 (overlapping), 1 (horiz/vert adjacent), or √1
				// (diagonally adjacent), then don't move the knot. Knot only
				// moves if distance >= 2
				if (distance >= 2) {
					if (horizontalDistance < 0) {
						// Negative horizontal distance means previous knot is left of current knot
						knot.x--;
					} else if (horizontalDistance > 0) {
						// Positive horizontal distance means previous knot is right of current knot
						knot.x++;
					}
			
					if (verticalDistance < 0) {
						// Negative vertical distance means previous knot is below current knot
						knot.y--;
					} else if (verticalDistance > 0) {
						// Positive vertical distance means previous knot is above current knot
						knot.y++;
					}
				} else {
					// If one knot in the rope doesn't move, the following knots shouldn't either.
					break knots;
				}
			}

			tailVisits.add(JSON.stringify(tail));
		}
	}
	
	console.log(tailVisits.size);
})();