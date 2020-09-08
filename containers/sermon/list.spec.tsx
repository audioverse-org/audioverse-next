import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import { getSermonCount, getSermons } from '../../lib/api';
import { entriesPerPage, languages } from '../../lib/constants';
import SermonList, { getStaticPaths, getStaticProps } from '../../pages/[language]/sermons/page/[i]';

jest.mock('../../lib/api');
jest.mock('next/router');

function loadQuery(query = {}) {
	(useRouter as jest.Mock).mockReturnValue({ query });
}

const renderPage = async ({ params = {}, query = {} } = {}) => {
	loadQuery(query);
	const { props } = await getStaticProps({ params });
	return render(<SermonList {...props} />);
};

function setSermonCount(count: number) {
	(getSermonCount as jest.Mock).mockReturnValue(Promise.resolve(count));
}

function loadSermons() {
	(getSermons as jest.Mock).mockReturnValue({
		nodes: [
			{
				id: 1,
				title: 'the_sermon_title',
			},
		],
	});
}

describe('sermons list page', () => {
	beforeEach(() => jest.resetAllMocks());

	it('can be rendered', async () => {
		loadSermons();

		await renderPage();
	});

	it('generates static paths', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/page/1');
	});

	it('generates in all languages', async () => {
		setSermonCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/page/1');
	});

	it('sets proper fallback strategy', async () => {
		setSermonCount(1);

		const { fallback } = await getStaticPaths();

		expect(fallback).toBe('unstable_blocking');
	});

	it('generates all pages in language', async () => {
		setSermonCount(100 * entriesPerPage);

		const result = await getStaticPaths();

		const expected = 100 * Object.keys(languages).length;
		expect(result.paths.length).toBe(expected);
	});

	it('uses language codes to get sermon counts', async () => {
		setSermonCount(1);

		await getStaticPaths();

		expect(getSermonCount).toBeCalledWith('ENGLISH');
	});

	it('gets sermons for list page', async () => {
		loadSermons();

		await getStaticProps({ params: { i: 2, language: 'en' } });

		await waitFor(() =>
			expect(getSermons).toBeCalledWith('ENGLISH', {
				offset: entriesPerPage,
				first: entriesPerPage,
			})
		);
	});

	it('displays sermons list', async () => {
		loadSermons();

		const { getByText } = await renderPage();

		expect(getByText('the_sermon_title')).toBeDefined();
	});
});
