import doesFcbhVersionHaveChapter from './doesFcbhVersionHaveChapter';

describe('doesFcbhVersionHaveChapter', () => {
	it('should return true if the version has the chapter', () => {
		const result = doesFcbhVersionHaveChapter('ENGKJV2', 'GEN', 1);
		expect(result).toBe(true);
	});

	it('should return false if the version does not have the chapter', () => {
		const result = doesFcbhVersionHaveChapter('ENGKJV2', 'GEN', 10000);
		expect(result).toBe(false);
	});
});
