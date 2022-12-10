/**
 * Gets the hypotenuse of a right triangle, given the known lengths
 * of the two legs. Useful if you have a horizontal distance and a
 * vertical distance, and you want to get the true distance between.
 * @returns hypotenuse length
 */
export function getHypotenuseLength(legA: number, legB: number) {
	const a_2 = legA * legA;
	const b_2 = legB * legB;
	return Math.sqrt(a_2 + b_2);
}

/**
 * Gets the length of a right triangle's unknown leg, given the
 * lengths of its hypotenuse and its known leg.
 * @param hypotenuse length of the hypotenuse
 * @param knownLeg length of the known leg
 * @returns length of the other leg
 */
export function getLegLength(hypotenuse: number, knownLeg: number) {
	const c_2 = hypotenuse * hypotenuse;
	const a_2 = knownLeg * knownLeg;
	return Math.sqrt(c_2 - a_2);
}