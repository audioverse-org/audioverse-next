import { when } from 'jest-when';

import {
	GetSongDetailTagPageDataDocument,
	GetSongDetailTagPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SongDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/tag/[tag]';

const renderPage = buildRenderer(SongDetail, getStaticProps, {
	language: 'en',
	tag: 'the_tag_name',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSongDetailTagPageDataDocument, expect.anything())
		.mockResolvedValue({
			musicTracks: {
				nodes: [
					{
						id: 'first_song_id',
						title: 'first_song_title',
					},
					{ id: 'second_song_id', title: 'second_song_title' },
				],
			},
		});
}

describe('song tag detail page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSongDetailTagPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				tag: 'the_tag_name',
			},
		});
	});

	it('renders recording list', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('second_song_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongDetailTagPathsDataDocument, expect.anything())
			.mockResolvedValue({
				musicMoodTags: {
					nodes: [
						{
							name: 'the_tag_name',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/tag/the_tag_name');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongDetailTagPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('lower cases static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongDetailTagPathsDataDocument, expect.anything())
			.mockResolvedValue({
				musicMoodTags: {
					nodes: [
						{
							name: 'TheTagName',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/tag/thetagname');
	});
});
