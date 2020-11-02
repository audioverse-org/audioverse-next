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
});
