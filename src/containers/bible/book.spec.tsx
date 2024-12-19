import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '~components/templates/andMiniplayer';
import AndPlaybackContext from '~components/templates/andPlaybackContext';
import { BookProps } from '~containers/bible/book';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import setPlayerMock from '~lib/test/setPlayerMock';
import Book, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/bibles/[id]/[book]/[chapter]';
import * as bibleBrain from '~src/services/fcbh/getBible';
import { getBibleBookChapters } from '~src/services/fcbh/getBibleBookChapters';
import { getBibles } from '~src/services/fcbh/getBibles';
import { IBibleBookChapter, IBibleVersion } from '~src/services/fcbh/types';

jest.mock('~services/fcbh/getBibles');
jest.mock('~services/fcbh/getBibleBookChapters');
jest.mock('video.js');

const renderPage = buildStaticRenderer((props: BookProps) => {
	return (
		<AndPlaybackContext>
			<AndMiniplayer>
				<Book {...props} />
			</AndMiniplayer>
		</AndPlaybackContext>
	);
}, getStaticProps);

function loadPageData() {
	jest.spyOn(bibleBrain, 'getBible').mockResolvedValue({
		id: 'the_version_id',
		abbreviation: 'KJV',
		title: 'the_version_title',
		sponsor: {
			title: 'the_sponsor_name',
			website: 'the_sponsor_url',
		},
		books: [
			{
				book_id: 'the_version_id/the_book_shortname',
				name: 'Genesis',
				chapters: [50],
				bible: {
					abbreviation: 'ESV',
				},
			},
		],
	} as IBibleVersion);
	jest.mocked(getBibleBookChapters).mockResolvedValue([
		{
			id: 'GEN/1',
			duration: 123,
			number: 1,
			title: 'the_chapter_title',
			url: 'https://example.com',
		},
	] as IBibleBookChapter[]);
}

describe('Bible book detail page', () => {
	let scrollToProto: any;

	beforeAll(() => {
		scrollToProto = Element.prototype.scrollTo;
		Element.prototype.scrollTo = () => void 0;
	});

	afterAll(() => {
		Element.prototype.scrollTo = scrollToProto;
	});

	beforeEach(() => {
		setPlayerMock();

		__loadRouter({
			asPath: '/en/bibles/ENGESVC/Gen/1',
			query: {
				id: 'the_version_id',
				book: 'the_book_shortname',
				chapter: '1',
			},
		});

		window.fetch = jest.fn().mockReturnValueOnce({
			catch: () => undefined,
		});
	});

	it('renders', async () => {
		loadPageData();

		await renderPage();
	});

	it('generates paths', async () => {
		jest.mocked(getBibles).mockResolvedValue([
			{
				id: 'the_version_id',
				abbreviation: 'KJV',
				title: 'the_version_title',
				sponsor: {
					title: 'FCBH',
					website: '',
				},
				books: [
					{
						book_id: 'ENGESVC/Gen',
						chapters: [1],
					},
				],
			} as IBibleVersion,
		]);

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles/ENGESVC/Gen/1');
	});

	it('displays chapter title', async () => {
		loadPageData();

		const { getAllByText } = await renderPage();

		expect(getAllByText('the_chapter_title')[0]).toBeInTheDocument();
	});

	it('displays version abbreviation', async () => {
		loadPageData();

		const { getAllByText } = await renderPage();

		expect(getAllByText('KJV Bible')[0]).toBeInTheDocument();
	});

	it('displays sponsor name', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toBeInTheDocument();
	});

	it('displays sponsor url', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toHaveAttribute(
			'href',
			'the_sponsor_url',
		);
	});

	it('includes player', async () => {
		loadPageData();

		const { getAllByLabelText } = await renderPage();

		await userEvent.click(getAllByLabelText('play')[0]);

		await waitFor(() => expect(videojs).toBeCalled());

		expect(window.fetch).toBeCalled();
	});
});
