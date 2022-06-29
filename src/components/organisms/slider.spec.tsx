import userEvent from '@testing-library/user-event';
import React from 'react';

import CardSermon from '@components/molecules/card/sermon';
import Slider from '@components/organisms/slider';
import { buildRenderer } from '@lib/test/buildRenderer';
import { screen } from '@testing-library/react';

const renderComponent = buildRenderer(Slider);

function getEls(n: number): JSX.Element[] {
	return Array.from(new Array(n).keys()).map((i) => <i key={i} />);
}

describe('card slider', () => {
	it('renders left button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
	});

	it('renders right button', async () => {
		await renderComponent();

		expect(screen.getByLabelText('Next page')).toBeInTheDocument();
	});

	it('renders cards', async () => {
		await renderComponent({
			props: {
				children: (
					<CardSermon
						recording={
							{
								title: 'the_recording_title',
								canonicalPath: 'the_recording_path',
								persons: [],
							} as any
						}
					/>
				),
			},
		});

		expect(screen.getByText('the_recording_title')).toBeInTheDocument();
	});

	it('pages right', async () => {
		await renderComponent({
			props: {
				children: getEls(5),
			},
		});

		userEvent.click(screen.getByLabelText('Next page'));

		const pane = screen.getByTestId('slider');

		expect(pane.style.getPropertyValue('--activeSlide')).toEqual('1');
	});

	it('tracks page position', async () => {
		await renderComponent({
			props: {
				children: getEls(5),
			},
		});

		userEvent.click(screen.getByLabelText('Next page'));
		userEvent.click(screen.getByLabelText('Next page'));

		const pane = screen.getByTestId('slider');

		expect(pane.style.getPropertyValue('--activeSlide')).toEqual('2');
	});

	it('pages left', async () => {
		await renderComponent({
			props: {
				children: getEls(5),
			},
		});

		userEvent.click(screen.getByLabelText('Next page'));
		userEvent.click(screen.getByLabelText('Previous page'));

		const pane = screen.getByTestId('slider');

		expect(pane.style.getPropertyValue('--activeSlide')).toEqual('0');
	});

	it('does not page left past start', async () => {
		await renderComponent({
			props: {
				children: getEls(5),
			},
		});

		userEvent.click(screen.getByLabelText('Previous page'));
		userEvent.click(screen.getByLabelText('Next page'));

		const pane = screen.getByTestId('slider');

		expect(pane.style.getPropertyValue('--activeSlide')).toEqual('1');
	});

	it('does not page right past end', async () => {
		await renderComponent({
			props: {
				children: getEls(1),
			},
		});

		userEvent.click(screen.getByLabelText('Next page'));

		const pane = screen.getByTestId('slider');

		expect(pane.style.getPropertyValue('--activeSlide')).toEqual('0');
	});

	it('displays pagination dots', async () => {
		await renderComponent({
			props: {
				perSlide: 3,
				children: getEls(5),
			},
		});

		expect(screen.getByLabelText('Slider Pagination').childNodes).toHaveLength(
			2
		);
	});

	it('highlights active dot', async () => {
		await renderComponent({
			props: {
				children: getEls(5),
			},
		});

		expect(screen.getByLabelText('Page 1')).toHaveClass('active');
	});

	it('calculates dot count dynamically', async () => {
		await renderComponent({
			props: {
				perSlide: 3,
				children: getEls(4),
			},
		});

		expect(screen.getByLabelText('Slider Pagination').childNodes).toHaveLength(
			2
		);
	});

	it('defaults to one card per slide', async () => {
		await renderComponent({
			props: {
				children: getEls(4),
			},
		});

		expect(screen.getByLabelText('Slider Pagination').childNodes).toHaveLength(
			4
		);
	});
});
