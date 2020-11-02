import fs from 'fs';

import * as feed from 'feed';

import createFeed from './createFeed';

jest.mock('fs');
jest.mock('feed');

const mockFeed = () => {
	const addItem = jest.fn();
	const rss2 = jest.fn();
	jest.spyOn(feed, 'Feed').mockImplementation(() => ({ addItem, rss2 } as any));

	return { addItem, rss2 };
};

describe('createFeed', () => {
	it('can be called', async () => {
		mockFeed();

		await createFeed({ recordings: [], title: '' });

		expect(fs.writeFileSync).toBeCalled();
	});

	it('makes feed', async () => {
		mockFeed();

		await createFeed({ recordings: [], title: '' });

		expect(feed.Feed).toBeCalled();
	});

	it('writes file', async () => {
		const { addItem } = mockFeed();

		await createFeed({ recordings: [{}], title: '' });

		expect(addItem).toBeCalled();
	});

	it('includes feed title', async () => {
		const { rss2 } = mockFeed();

		await createFeed({ recordings: [], title: 'the_title' });

		expect(rss2).toBeCalled();
	});
});
