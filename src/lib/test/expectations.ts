export function filterByExpectation<T>(items: T[], expectation: unknown): T[] {
	return items.filter((item) => {
		try {
			expect(item).toEqual(expectation);
			return true;
		} catch (_e) {
			// noop
		}
		return false;
	});
}
