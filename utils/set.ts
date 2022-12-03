/**
 * Gets the union of all provided lists
 * @param lists lists or sets of items
 * @returns a Set of all items that appear in at least one list
 */
export function union<T>(...lists: Iterable<T>[]) {
	const setUnion = new Set<T>();
	for (const list of lists) {
		for (const item of list) {
			setUnion.add(item);
		}
	}
	return setUnion;
}

/**
 * Gets the intersection of all provided lists
 * @param lists lists or sets of items
 * @returns a Set of all items that appear in every provided list
 */
export function intersection<T>(...lists: Iterable<T>[]) {
	const sets = lists.map(list => new Set(list));
	const firstSet = sets[0];

	const setIntersection = new Set<T>();
	for (const item of firstSet) {
		if (sets.every(set => set.has(item))) {
			setIntersection.add(item);
		}
	}

	return setIntersection;
}

/**
 * Gets the difference between a list and any other provided lists.
 * Order matters! The difference operation is not commutative.
 * @param firstList target list to remove elements from
 * @param remainingLists remaining lists which may contain duplicate elements of `firstList`
 * @returns a Set of all elements that appear in the first list, but none of the others
 */
export function difference<T>(firstList: Iterable<T>, ...remainingLists: Iterable<T>[]) {
	const firstSet = new Set(firstList);
	const remainingSets = remainingLists.map(list => new Set(list));

	const setDifference = new Set(firstSet);
	for (const item of firstSet) {
		if (remainingSets.some(set => set.has(item))) {
			setDifference.delete(item);
		}
	}

	return setDifference;
}