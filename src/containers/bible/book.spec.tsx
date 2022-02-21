import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext from '@components/templates/andPlaybackContext';
import { BookProps } from '@containers/bible/book';
import * as bibleBrain from '@lib/api/bibleBrain';
import {
	buildStaticRenderer,
	loadRouter,
	setPlayerMock,
} from '@lib/test/helpers';
import Book, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles/[id]/[book]/[chapter]';

jest.mock('@lib/api/bibleBrain');
jest.mock('video.js');
jest.mock('next/router');

const renderPage = buildStaticRenderer(
	(props: BookProps) => {
		return (
			<AndPlaybackContext>
				<AndMiniplayer>
					<Book {...props} />
				</AndMiniplayer>
			</AndPlaybackContext>
		);
	},
	getStaticProps,
	{
		id: 'the_version_id',
		book: 'the_book_shortname',
		chapter: '1',
	}
);

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
	} as bibleBrain.IBibleVersion);
	jest.spyOn(bibleBrain, 'getBibleBookChapters').mockResolvedValue([
		{
			id: 'GEN/1',
			duration: 123,
			number: 1,
			title: 'the_chapter_title',
			url: 'someurl',
		},
	] as bibleBrain.IBibleBookChapter[]);
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
		loadRouter({
			asPath: '/en/bibles/ENGESVC/Gen/1',
		});
	});

	it('renders', async () => {
		loadPageData();

		await renderPage();
	});

	it('generates paths', async () => {
		jest.spyOn(bibleBrain, 'getBibles').mockResolvedValue([
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
			} as bibleBrain.IBibleVersion,
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
			'the_sponsor_url'
		);
	});

	it('includes player', async () => {
		loadPageData();

		await act(async () => {
			const { getAllByLabelText } = await renderPage();
			userEvent.click(getAllByLabelText('play')[0]);
		});
		expect(videojs).toBeCalled();
	});
});
