import SermonList, { getStaticPaths, getStaticProps } from '../../pages/[language]/sermons/page/[i]';
import { render } from '@testing-library/react';
import React from 'react';
import { useRouter } from 'next/router';
import { getSermonCount } from '../../lib/api';
import { entriesPerPage, languages } from '../../lib/constants';

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

describe('sermons list page', () => {
	it('can be rendered', async () => {
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
		await getStaticPaths();

		expect(getSermonCount).toBeCalledWith('ENGLISH');
	});
});
