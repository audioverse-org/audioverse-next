import { render } from '@testing-library/react';
import React from 'react';

import { getTestimonies, getTestimonyCount } from '@lib/api';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import Testimonies, { getStaticPaths, getStaticProps } from '@pages/[language]/testimonies/page/[i]';

jest.mock('@lib/api');

function setEntityCount(count: number) {
	(getTestimonyCount as jest.Mock).mockReturnValue(Promise.resolve(count));
}

function loadTestimonies() {
	(getTestimonies as jest.Mock).mockResolvedValue({
		nodes: [
			{
				author: 'the_testimony_author',
				body: 'the_testimony_body',
				writtenDate: 'the_testimony_date',
			},
		],
	});
}

async function renderPage() {
	const params = { i: '1', language: 'en' };
	const { props } = await getStaticProps({ params });

	return render(<Testimonies {...props} />);
}

describe('testimonies pages', () => {
	it('renders', async () => {
		loadTestimonies();

		await renderPage();
	});

	it('revalidates', async () => {
		loadTestimonies();

		const { revalidate } = await getStaticProps({ params: { i: '1', language: 'en' } });

		expect(revalidate).toBe(10);
	});

	it('gets testimony count', async () => {
		setEntityCount(0);

		await getStaticPaths();

		expect(getTestimonyCount).toBeCalledWith('ENGLISH');
	});

	it('generates static paths', async () => {
		setEntityCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/testimonies/page/1');
	});

	it('sets path fallback strategy', async () => {
		setEntityCount(1);

		const result = await getStaticPaths();

		expect(result.fallback).toBe('unstable_blocking');
	});

	it('gets page of testimonies', async () => {
		loadTestimonies();

		await getStaticProps({ params: { language: 'en', i: '1' } });

		expect(getTestimonies).toBeCalledWith('ENGLISH', {
			offset: 0,
			first: ENTRIES_PER_PAGE,
		});
	});

	it('lists testimonies', async () => {
		loadTestimonies();

		const { getByText } = await renderPage();

		expect(getByText('the_testimony_body')).toBeDefined();
	});

	it('paginates', async () => {
		loadTestimonies();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeDefined();
	});

	it('links pagination properly', async () => {
		loadTestimonies();

		const { getByText } = await renderPage(),
			link = getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/testimonies/page/1');
	});
});
