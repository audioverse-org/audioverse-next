import { when } from 'jest-when';

import {
	GetPresenterDetailPageDataDocument,
	GetPresenterDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import writeFeedFile from '@lib/writeFeedFile';
import Presenter, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/[id]/page/[i]';

jest.mock('@lib/writeFeedFile');

const renderPage = buildRenderer(Presenter, getStaticProps, {
	language: 'en',
	id: 'the_presenter_id',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetPresenterDetailPageDataDocument, expect.anything())
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
						},
					],
				},
			},
		});
}

describe('presenter detail page', () => {
	// TODO: Delete test when covered by future tests
	it('renders', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
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

		expect(paths).toContain('/en/presenters/the_presenter_id/page/1');
	});

	it('generates rss feeds', async () => {
		loadData();

		await getStaticProps({
			params: { language: 'en', id: 'the_presenter_id', i: '1' },
		});

		expect(writeFeedFile).toBeCalledWith({
			recordings: expect.any(Array),
			projectRelativePath: 'public/en/presenters/the_presenter_id.xml',
			title: 'the_presenter_name | AudioVerse English',
		});
	});

	it('skips rss generation if no entity name', async () => {
		when(mockedFetchApi)
			.calledWith(GetPresenterDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				person: {
					name: undefined,
					recordings: {
						nodes: [
							{
								id: 'the_recording_id',
							},
						],
					},
				},
			});

		await getStaticProps({
			params: { language: 'en', id: 'the_presenter_id', i: '1' },
		});

		expect(writeFeedFile).not.toBeCalled();
	});

	it('links to rss feed', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('RSS')).toHaveAttribute(
			'href',
			'/en/presenters/the_presenter_id.xml'
		);
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
			'/en/presenters/the_presenter_id/page/1'
		);
	});

	it('displays speaker name', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_presenter_name')).toBeInTheDocument();
	});

	it('displays speaker summary', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_presenter_summary')).toBeInTheDocument();
	});

	it('renders description', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('description')).toBeInTheDocument();
	});

	it('displays person image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_presenter_name')).toHaveAttribute(
			'src',
			'the_presenter_image'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetPresenterDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
