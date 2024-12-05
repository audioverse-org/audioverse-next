import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import PresenterRecordings, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/presenters/[id]/teachings/page/[i]';
import { RecordingContentType } from '~src/__generated__/graphql';

import { GetPresenterDetailPathsDataDocument } from './__generated__/detail';
import { GetPresenterRecordingsPageDataDocument } from './__generated__/recordings';

const renderPage = buildStaticRenderer(PresenterRecordings, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetPresenterRecordingsPageDataDocument, expect.anything())
		.mockResolvedValue({
			person: {
				id: 'the_presenter_id',
				name: 'the_presenter_name',
				summary: 'the_presenter_summary',
				description: '<i>the</i> <b>description</b>',
				imageWithFallback: {
					url: 'the_presenter_image',
				},
				recordings: {
					nodes: [
						{
							id: 'the_recording_id',
							title: 'the_recording_title',
							canonicalPath: 'the_recording_path',
							recordingContentType: RecordingContentType.Sermon,
							speakers: [],
							recordings: {
								aggregate: {
									count: 0,
								},
							},
						},
					],
				},
			},
		});
}

describe('presenter recordings page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_presenter_id',
			i: '1',
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetPresenterDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				persons: {
					nodes: [
						{
							id: 'the_presenter_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/presenters/the_presenter_id/teachings/page/1');
	});

	it('lists presenter recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/presenters/the_presenter_id/teachings',
		);
	});

	it('displays speaker name', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_presenter_name')).toBeInTheDocument();
	});

	it('displays person image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_presenter_name')).toHaveAttribute(
			'src',
			'the_presenter_image',
		);
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetPresenterRecordingsPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
