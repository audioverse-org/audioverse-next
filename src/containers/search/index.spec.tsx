import { __loadQuery } from 'next/router';
import React from 'react';

import {
	GetSearchResultsPageDataDocument,
	GetSearchResultsPageDataQuery,
	RecordingContentType,
} from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/search';

import { screen, waitFor } from '@testing-library/react';
import { buildLoader } from '@lib/test/buildLoader';
import userEvent from '@testing-library/user-event';

jest.mock('next/head');

const renderPage = () => renderWithProviders(<Search />);

const empty = {
	aggregate: {
		count: 0,
	},
	nodes: [],
	pageInfo: {
		hasNextPage: false,
	},
};

const loadData = buildLoader<GetSearchResultsPageDataQuery>(
	GetSearchResultsPageDataDocument,
	{
		recordings: empty,
		serieses: empty,
		conferences: empty,
		sponsors: empty,
		persons: empty,
		audiobooks: empty,
		musicTracks: empty,
		storyPrograms: empty,
	}
);

describe('search', () => {
	beforeEach(() => {
		__loadQuery({
			q: 'test',
		});
		loadData();
	});

	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes props', async () => {
		const { props } = (await getStaticProps({
			params: {
				language: 'en',
			},
		})) as any;

		expect(props).toBeDefined();
	});

	it('includes search term in title', async () => {
		await renderPage();

		await waitFor(() => {
			expect(screen.getByTestId('head')).toHaveTextContent(
				'Search | "test" | AudioVerse'
			);
		});
	});

	it('filters to presenters', async () => {
		loadData({
			recordings: {
				nodes: [
					{
						__typename: 'Recording',
						id: 'recording',
						title: 'the_recording_title',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
						canonicalPath: '/en/recordings/recording',
					},
				],
			},
		});

		await renderPage();

		await screen.findByText('the_recording_title');

		userEvent.click(screen.getByRole('button', { name: 'Presenters' }));

		expect(screen.queryByText('the_recording_title')).not.toBeInTheDocument();
	});

	it('does not show empty sections on all tab', async () => {
		await renderPage();

		expect(
			screen.queryByRole('heading', {
				name: 'Presenters',
			})
		).not.toBeInTheDocument();
	});
});
