import getBookMeta from './getBookMeta';

describe('getBookMeta', () => {
	const testCases: { input: string; expected: string | undefined }[] = [
		{
			input: 'Genesis',
			expected: 'Genesis',
		},
		{
			input: 'PSA',
			expected: 'Psalms',
		},
		{
			input: 'JHN',
			expected: 'John',
		},
		{
			input: 'REV',
			expected: 'Revelation',
		},
		{
			input: 'genesis',
			expected: 'Genesis',
		},
		{
			input: 'invalid',
			expected: undefined,
		},
		{
			input: 'Exod',
			expected: 'Exodus',
		},
		{
			input: 'ENGKJV2/GEN',
			expected: 'Genesis',
		},
	];

	test.each(testCases)(
		'returns "$expected" for input "$input"',
		({ input, expected }) =>
			expect(getBookMeta(input)?.fullName).toBe(expected),
	);
});
