import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { buildLoader } from '~src/lib/test/buildLoader';
import { buildStaticRenderer } from '~src/lib/test/buildStaticRenderer';
import Topic, {
	getStaticPaths,
	getStaticProps,
} from '~src/pages/[language]/topics/[id]/[[...slugs]]';

import {
	GetTopicDetailDataDocument,
	GetTopicDetailDataQuery,
	GetTopicDetailStaticPathsDocument,
	GetTopicDetailStaticPathsQuery,
} from './__generated__/detail';

const render = buildStaticRenderer(Topic, getStaticProps);
const loadData = buildLoader<GetTopicDetailDataQuery>(
	GetTopicDetailDataDocument,
	{
		topic: {
			title: 'The Title',
			canonicalPath: '/en/topics/1/the-title',
			items: {
				nodes: [
					{
						entity: {
							__typename: 'Sequence',
							title: 'The Sequence Title',
							contentType: SequenceContentType.Series,
							sequenceSpeakers: {
								nodes: [],
							},
							allRecordings: {
								aggregate: {
									count: 0,
								},
							},
							canonicalPath: '',
						},
					},
					{
						entity: {
							__typename: 'Recording',
							title: 'The Recording Title',
							recordingContentType: RecordingContentType.Sermon,
							speakers: [],
							canonicalPath: '',
						},
					},
				],
			},
		},
	},
);
const loadStaticPathsData = buildLoader<GetTopicDetailStaticPathsQuery>(
	GetTopicDetailStaticPathsDocument,
	{
		topics: {
			nodes: [
				{
					id: 1,
					title: 'The Title',
					canonicalPath: '/en/topics/1/the-title',
				},
			],
		},
	},
);

describe('Topic', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_topic_id',
		});
	});

	it('renders', async () => {
		loadData();

		await render();

		expect(fetchApi).toBeCalledWith(GetTopicDetailDataDocument, {
			variables: {
				id: 'the_topic_id',
			},
		});
	});

	it('generates static paths', async () => {
		loadStaticPathsData();

		const result = await getStaticPaths();

		expect(result.paths).toEqual(
			expect.arrayContaining(['/en/topics/1/the-title']),
		);
	});

	it('renders title', async () => {
		loadData();

		await render();

		expect(screen.getByText('The Title')).toBeInTheDocument();
	});

	it('renders sequence title', async () => {
		loadData();

		await render();

		expect(screen.getByText('The Sequence Title')).toBeInTheDocument();
	});

	it('renders recording title', async () => {
		loadData();

		await render();

		expect(screen.getByText('The Recording Title')).toBeInTheDocument();
	});

	it('does not render empty metadata', async () => {
		loadData({
			topic: {
				description: '',
			},
		});

		await render();

		expect(screen.queryByText('Description')).not.toBeInTheDocument();
	});
});
