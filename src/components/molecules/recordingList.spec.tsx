import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import RecordingList from '@components/molecules/recordingList';
import { loadQuery } from '@lib/test/helpers';

async function renderComponent({
	sermonData = {},
	language = 'en',
} = {}): Promise<RenderResult> {
	loadQuery({ language });

	return render(
		<RecordingList
			sermons={[
				{
					imageWithFallback: {
						url: 'the_url',
					},
					title: 'the_title',
					persons: [{ name: 'the_person_name', id: 'the_person_id' }],
					duration: 600,
					...sermonData,
				} as any,
			]}
		/>
	);
}

describe('recording list', () => {
	it('renders', async () => {
		await renderComponent();
	});

	it('has image', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toBeInTheDocument();
	});

	it('sets image src', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toHaveAttribute('src', 'the_url');
	});

	it('sets alt', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('img')).toHaveAttribute('alt', 'the_title');
	});

	it('includes presenter names', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toBeInTheDocument();
	});

	it('includes presenter link', async () => {
		const { getByRole } = await renderComponent();

		expect(getByRole('link', { name: 'the_person_name' })).toHaveAttribute(
			'href',
			'/en/presenters/the_person_id'
		);
	});

	it('includes duration', async () => {
		const { getByText } = await renderComponent();

		expect(getByText('10:00')).toBeInTheDocument();
	});

	it('includes seconds in duration', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 601,
			},
		});

		expect(getByText('10:01')).toBeInTheDocument();
	});

	it('includes hours in duration', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 60 * 60,
			},
		});

		expect(getByText('1:00:00')).toBeInTheDocument();
	});

	it('pads seconds correctly', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 610,
			},
		});

		expect(getByText('10:10')).toBeInTheDocument();
	});

	it('rounds seconds', async () => {
		const { getByText } = await renderComponent({
			sermonData: {
				duration: 0.7,
			},
		});

		expect(getByText('0:01')).toBeInTheDocument();
	});

	it('handles missing sermons', async () => {
		loadQuery({ language: 'en' });

		await render(<RecordingList sermons={undefined as any} />);
	});
});
