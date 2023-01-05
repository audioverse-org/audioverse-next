import React from 'react';

import * as bibleBrain from '@lib/api/bibleBrain';
import { GetAudiobibleVersionsDataDocument } from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import renderWithProviders from '@lib/test/renderWithProviders';
import Versions, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/bibles';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';

vi.mock('@lib/api/bibleBrain');

async function renderPage() {
	const { props } = (await getStaticProps({})) as any;
	return renderWithProviders(<Versions {...props} />, undefined);
}

const loadData = buildLoader(GetAudiobibleVersionsDataDocument, {
	collections: {
		nodes: [],
	},
});

function loadPageData() {
	loadData();
	vi.spyOn(bibleBrain, 'getBibles').mockResolvedValue([
		{
			id: 'the_version_id',
			abbreviation: 'KJV',
			title: 'the_version_title',
			sponsor: {
				title: 'FCBH',
				website: '',
			},
			books: [],
		} as bibleBrain.IBibleVersion,
	]);
}

describe('versions list', () => {
	it('renders versions', async () => {
		loadPageData();

		await renderPage();

		expect(await screen.findByText('the_version_title')).toBeInTheDocument();
	});

	it('provides language paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/bibles');
	});

	it('links entries', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		const link = getByText('the_version_title')
			.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/en/bibles/the_version_id');
	});

	it('renders 404', async () => {
		vi.spyOn(bibleBrain, 'getBibles').mockResolvedValue([]);

		const { notFound } = (await getStaticProps({})) as any;

		expect(notFound).toBe(true);
	});
});
