import { when } from 'jest-when';

import {
	GetSongSponsorPageDataDocument,
	GetSongSponsorPathsDataDocument,
} from '@lib/generated/graphql';
import {
	buildStaticRenderer,
	mockedFetchApi,
	setPlayerMock,
} from '@lib/test/helpers';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/sponsor/[id]';

const renderPage = buildStaticRenderer(Song, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
});

describe('song sponsor detail page', () => {
	beforeEach(() => {
		setPlayerMock();
	});

	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSongSponsorPageDataDocument, {
			variables: {
				id: 'the_sponsor_id',
			},
		});
	});

	it('renders recording list', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongSponsorPageDataDocument, expect.anything())
			.mockResolvedValue({
				sponsor: {
					recordings: {
						nodes: [
							{
								id: 'first_song_id',
								title: 'first_song_title',
							},
							{
								id: 'second_song_id',
								title: 'second_song_title',
							},
						],
					},
				},
			});

		const { getByText } = await renderPage();

		expect(getByText('second_song_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongSponsorPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [
						{
							id: 'the_album_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/sponsor/the_album_id');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongSponsorPathsDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
