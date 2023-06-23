export function filterByExpectation<T>(items: T[], expectation: unknown): T[] {
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

export function filterExpectations<T, E>(item: T, expectations: E[]): E[] {
	return expectations.filter((expectation) => {
		try {
			expect(item).toEqual(expectation);
			return true;
		} catch (e) {
			// noop
		}
		return false;
	});
}
