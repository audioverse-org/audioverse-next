import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import { loadQuery, renderWithIntl } from '@lib/test/helpers';

jest.mock('@lib/api/fetchApi');

async function renderComponent({
	sermonData = {},
	language = 'en',
} = {}): Promise<RenderResult> {
	loadQuery({ language });

	const _p = {
		recordings: [
			{
				id: 'the_recording_id',
				imageWithFallback: {
					url: 'the_url',
				},
				title: 'the_title',
				canonicalPath: 'the_path',
				persons: [
					{
						name: 'the_person_name',
						id: 'the_person_id',
						canonicalPath: 'the_person_canonical_path',
						imageWithFallback: { url: 'the_person_image_url' },
					},
				],
				duration: 600,
				...sermonData,
			} as any,
		],
	};
	return renderWithIntl(<RecordingList {..._p} />);
}

describe('recording list', () => {
	it('renders', async () => {
		await renderComponent();
	});

	it('has image', async () => {
		const { getAllByRole } = await renderComponent();

		expect(getAllByRole('img')[0]).toBeInTheDocument();
	});

	it('sets image src', async () => {
		const { getAllByRole } = await renderComponent();

		expect(getAllByRole('img')[0]).toHaveAttribute('src', 'the_url');
	});

	it('sets alt', async () => {
		const { getAllByRole } = await renderComponent();

		expect(getAllByRole('img')[0]).toHaveAttribute('alt', 'the_title');
	});

	it('includes presenter names', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toBeInTheDocument();
	});

	it('includes presenter link', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toHaveAttribute(
			'href',
			'/the_person_canonical_path'
		);
	});

	it('includes duration', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('10m')).toBeInTheDocument();
	});

	it('drops seconds in duration', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 601,
			},
		});

		expect(getByText('10m')).toBeInTheDocument();
	});

	it('includes hours in duration', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 61 * 60,
			},
		});

		expect(getByText('1h 1m')).toBeInTheDocument();
	});

	it('handles missing sermons', async () => {
		loadQuery({ language: 'en' });

		await render(<RecordingList recordings={undefined as any} />);
	});
});
