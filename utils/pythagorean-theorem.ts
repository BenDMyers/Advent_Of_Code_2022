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