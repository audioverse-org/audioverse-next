import { waitFor } from '@testing-library/dom';
import { useRouter } from 'next/router';

import { getSermon, getSermons } from '@lib/api';
import SermonDetail, { getStaticPaths, getStaticProps } from '@pages/[language]/sermons/[id]';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('@lib/api');
jest.mock('next/router');

function loadRecentSermons() {
	(getSermons as jest.Mock).mockReturnValue({
		nodes: [
			{
				id: 1,
				title: 'the_sermon_title',
				recordingDate: '2020-06-01T09:30:00.000Z',
			},
		],
	});
}

function loadGetSermonError() {
	(getSermon as jest.Mock).mockImplementation(() => {
		throw new Error('API failure');
	});
}

async function renderPage() {
	const { props } = await getStaticProps({ params: { id: 1 } });
	return render(<SermonDetail {...props} />);
}

describe('detailPageGenerator', () => {
	beforeEach(() => jest.resetAllMocks());

	it('gets sermons', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() => expect(getSermons).toBeCalledWith('ENGLISH'));
	});

	it('gets recent sermons in all languages', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() => expect(getSermons).toBeCalledWith('SPANISH'));
	});

	it('returns paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/1');
	});

	it('generates localized paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/1');
	});

	it('catches API errors', async () => {
		loadGetSermonError();

		const result = await getStaticProps({ params: { id: 1 } });

		expect(result.props.sermon).toBeNull();
	});

	it('renders 404 on missing sermon', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadGetSermonError();

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeDefined();
	});
});
