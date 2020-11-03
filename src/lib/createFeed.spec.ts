import fs from 'fs';

import * as feed from 'feed';

import { PROJECT_ROOT } from '@lib/constants';
import { mockFeed } from '@lib/test/helpers';

import createFeed from './createFeed';

jest.mock('fs');

describe('createFeed', () => {
	it('can be called', async () => {
		mockFeed();

		await createFeed({ recordings: [], title: '', projectRelativePath: '' });

		expect(fs.writeFileSync).toBeCalled();
	});

	it('makes feed', async () => {
		mockFeed();

		await createFeed({ recordings: [], title: '', projectRelativePath: '' });

		expect(feed.Feed).toBeCalled();
	});

	it('writes file', async () => {
		const { addItem } = mockFeed();

		await createFeed({ recordings: [{}], title: '', projectRelativePath: '' });

		expect(addItem).toBeCalled();
	});

	it('includes feed title', async () => {
		const { rss2 } = mockFeed();

		await createFeed({
			recordings: [],
			title: 'the_title',
			projectRelativePath: '',
		});

		expect(rss2).toBeCalled();
	});

	it('writes to filesystem', async () => {
		const { rss2 } = mockFeed();

		rss2.mockReturnValue('content');

		await createFeed({
			recordings: [],
			title: 'the_title',
			projectRelativePath: 'the/out/file.xml',
		});

		expect(fs.writeFileSync).toBeCalledWith(
			`${PROJECT_ROOT}/the/out/file.xml`,
			'content'
		);
	});

	it('rejects paths outside project', async () => {
		mockFeed();

		await expect(async () =>
			createFeed({
				recordings: [],
				title: '',
				projectRelativePath: '../out.xml',
			})
		).rejects.toBeDefined();
	});

	it('creates folder tree', async () => {
		mockFeed();

		await createFeed({
			recordings: [],
			title: 'the_title',
			projectRelativePath: 'the/out/file.xml',
		});

		expect(fs.mkdirSync).toBeCalledWith(`${PROJECT_ROOT}/the/out`, {
			recursive: true,
		});
	});

	it('includes adds item', async () => {
		const { addItem } = mockFeed();

		await createFeed({
			recordings: [
				{
					title: 'recording_title',
					description: 'recording_description',
					recordingDate: '2007-03-05T12:00:00.000Z',
					canonicalUrl: 'the_url',
					audioFiles: [
						{
							url: 'file_url',
							duration: 1,
							filesize: '3', // should this be a number?
						},
					],
				},
			],
			title: 'the_title',
			projectRelativePath: 'the/out/file.xml',
		});

		expect(addItem).toBeCalledWith({
			title: 'recording_title',
			description: 'recording_description',
			date: new Date('2007-03-05T12:00:00.000Z'),
			link: 'the_url',
			enclosure: {
				url: 'file_url',
				length: '3',
			},
		});
	});
});
