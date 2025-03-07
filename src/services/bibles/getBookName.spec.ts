import getBookName from './getBookName';

describe('getBookName', () => {
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
	];

	test.each(testCases)(
		'returns "$expected" for input "$input"',
		({ input, expected }) => expect(getBookName(input)).toBe(expected),
	);
});
