import { when } from 'jest-when';
import React from 'react';

import { fetchApi } from '@lib/api/fetchApi';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import {
	GetTestimoniesPageDataDocument,
	GetTestimoniesPathsDataDocument,
	Testimony,
} from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import Testimonies, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/testimonies/page/[i]';
import { screen } from '@testing-library/react';

function loadTestimonies(nodes: Partial<Testimony>[] | null = null): void {
	when(fetchApi)
		.calledWith(GetTestimoniesPageDataDocument, expect.anything())
		.mockResolvedValue({
			testimonies: {
				nodes: (nodes as Testimony[]) || [
					{
						author: 'the_testimony_author',
						body: 'the_testimony_body',
						writtenDate: '2021-10-20 14:38:20',
					},
				],
				aggregate: {
					count: 100,
				},
			},
		});
}

function setEntityCount(count: number) {
	when(fetchApi)
		.calledWith(GetTestimoniesPathsDataDocument, expect.anything())
		.mockResolvedValue({
			testimonies: {
				aggregate: {
					count,
				},
			},
		});
}

async function renderPage() {
	const params = { i: '1', language: 'en' };
	const { props } = (await getStaticProps({ params })) as any;

	return renderWithProviders(<Testimonies {...props} />, undefined);
}

describe('testimonies pages', () => {
	it('revalidates', async () => {
		loadTestimonies();

		const { revalidate } = (await getStaticProps({
			params: { i: '1', language: 'en' },
		})) as any;

		expect(revalidate).toBe(3600);
	});

	it('gets testimony count', async () => {
		setEntityCount(0);

		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetTestimoniesPathsDataDocument, {
			variables: { language: 'ENGLISH' },
		});
	});

	it('generates static paths', async () => {
		setEntityCount(1);

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/testimonies/page/1');
	});

	it('sets path fallback strategy', async () => {
		setEntityCount(1);

		const result = await getStaticPaths();

		expect(result.fallback).toBe('blocking');
	});

	it('gets page of testimonies', async () => {
		loadTestimonies();

		await getStaticProps({ params: { language: 'en', i: '1' } });

		expect(fetchApi).toBeCalledWith(GetTestimoniesPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				offset: 0,
				first: ENTRIES_PER_PAGE,
			},
		});
	});

	it('lists testimonies', async () => {
		loadTestimonies();

		await renderPage();

		expect(screen.getByText('the_testimony_body')).toBeInTheDocument();
	});

	it('paginates', async () => {
		loadTestimonies();

		await renderPage();

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadTestimonies();

		await renderPage();
		const link = screen.getByText('1') as HTMLAnchorElement;

		expect(link.href).toContain('/en/testimonies');
	});

	it('renders testimony html', async () => {
		loadTestimonies([
			{
				body: '<p>text</p>',
				author: '',
				writtenDate: '',
			},
		]);

		await renderPage();

		expect(() => screen.getByText('<p>text</p>')).toThrow();
	});

	it('includes names', async () => {
		loadTestimonies();

		await renderPage();

		expect(
			screen.getByText('the_testimony_author, 10/20/21')
		).toBeInTheDocument();
	});

	it('renders without testimonies', async () => {
		await expect(renderPage).not.toThrow();
	});
});
