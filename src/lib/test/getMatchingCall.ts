export default function filterByExpectation<T>(
	items: T[],
	expectation: unknown
): T[] {
	return items.filter((item) => {
		try {
			expect(item).toEqual(expectation);
			return true;
		} catch (e) {
			// noop
		}
		return false;
	});
}
