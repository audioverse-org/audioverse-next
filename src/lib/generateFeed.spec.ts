import { advanceTo } from 'jest-date-mock';

import { generateFeed } from './generateFeed';

describe('generateFeed', () => {
	beforeAll(() => {
		advanceTo(new Date(2021, 8, 13, 12, 34, 56));
	});
	it('makes feed', () => {
		const result = generateFeed('', [], 'en');
		expect(result).toMatchSnapshot();
	});

	it('includes feed title', () => {
		const result = generateFeed('the_title', [], 'en');
		expect(result).toMatchSnapshot();
	});

	it('includes adds item', () => {
		const result = generateFeed(
			'the_title',
			[
				{
					title: 'recording_title',
					description: 'recording_description',
					recordingDate: '2007-03-05T12:00:00.000Z',
					canonicalUrl: 'the_url',
					audioFiles: [
						{
							url: 'https://www.example.com/file_url',
							filesize: '3',
						},
					],
					feedVideoFiles: [],
				},
			],
			'en'
		);
		expect(result).toMatchSnapshot();
	});
});
