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
	getStaticProps,
} from '~pages/[language]/bibles/[version]/[book]/[chapter]';
import getFcbhBible from '~src/services/bibles/fcbh/getFcbhBible';

jest.mock('~services/bibles/fcbh/getFcbhBibles');
jest.mock('~services/bibles/fcbh/fetchFcbhChapters');
jest.mock('~services/bibles/fcbh/getFcbhBible');
jest.mock('video.js');
jest.mock('p-timeout');

const renderPage = buildStaticRenderer((props: BookProps) => {
	return (
		<AndPlaybackContext>
			<AndMiniplayer>
				<Book {...props} />
			</AndMiniplayer>
		</AndPlaybackContext>
	);
}, getStaticProps);

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
				book: 'the_book_name',
				chapter: '1',
			},
		});

		window.fetch = jest.fn().mockReturnValueOnce({
			catch: () => undefined,
		});

		jest.mocked(getFcbhBible).mockReturnValue({
			id: 'test-bible',
			title: 'Test Bible',
			abbreviation: 'TEST',
			books: [
				{
					name: 'the_book_name',
					chapters_full: [
						{
							id: 'GEN/1',
							duration: 123,
							number: 1,
							title: 'the_chapter_title',
							url: 'https://example.com',
							text: '',
							book_name: '',
							version_id: 'ENGKJV',
							version_name: 'King James Version (Dramatized)',
						},
					],
					bible: {
						abbreviation: '',
					},
					book_id: '',
					name_short: 'the_book_shortname',
					chapters: [],
					book_seq: '',
					testament: '',
				},
			],
			sponsor: {
				title: 'the_sponsor_name',
				website: 'the_sponsor_url',
			},
		});
	});

	it('displays chapter title', async () => {
		const { getAllByText } = await renderPage();

		expect(getAllByText('the_chapter_title')[0]).toBeInTheDocument();
	});

	it('displays version abbreviation', async () => {
		const { getAllByText } = await renderPage();

		expect(getAllByText('KJV Bible')[0]).toBeInTheDocument();
	});

	it('displays sponsor name', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toBeInTheDocument();
	});

	it('displays sponsor url', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toHaveAttribute(
			'href',
			'the_sponsor_url',
		);
	});

	it('includes player', async () => {
		const { getAllByLabelText } = await renderPage();

		await userEvent.click(getAllByLabelText('play')[0]);

		await waitFor(() => expect(videojs).toBeCalled());
	});
});
