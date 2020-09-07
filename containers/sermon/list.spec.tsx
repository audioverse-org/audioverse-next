import SermonList, { getStaticProps, getStaticPaths } from '../../pages/[language]/sermons/page/[i]';
import { render } from '@testing-library/react';
import React from 'react';
import { useRouter } from 'next/router';

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

describe('sermons list page', () => {
	it('can be rendered', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/page/1');
	});

	it('generates in all languages', async () => {
		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/page/1');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe('unstable_blocking');
	});
});
