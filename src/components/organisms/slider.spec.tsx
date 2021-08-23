import userEvent from '@testing-library/user-event';
import React from 'react';

import CardSermon from '@components/molecules/card/sermon';
import Slider from '@components/organisms/slider';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(Slider);

function getEls(n: number): JSX.Element[] {
	return Array.from(new Array(n).keys()).map((i) => <i key={i} />);
}

describe('card slider', () => {
	it('renders left button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Previous page')).toBeInTheDocument();
	});

	it('renders right button', async () => {
		const { getByLabelText } = await renderComponent();

		expect(getByLabelText('Next page')).toBeInTheDocument();
	});

	it('renders cards', async () => {
		const { getByText } = await renderComponent({
			props: {
				children: (
					<CardSermon
						recording={
							{
								title: 'the_recording_title',
							} as any
						}
					/>
				),
			},
		});

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('pages right', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			props: {
				children: getEls(7),
			},
		});

		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual(
			'translateX(-100%)'
		);
	});

	it('tracks page position', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			props: {
				children: getEls(7),
			},
		});

		userEvent.click(getByLabelText('Next page'));
		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual(
			'translateX(-200%)'
		);
	});

	it('pages left', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			props: {
				children: getEls(7),
			},
		});

		userEvent.click(getByLabelText('Next page'));
		userEvent.click(getByLabelText('Previous page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual('translateX(-0%)');
	});

	it('does not page left past start', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			props: {
				children: getEls(7),
			},
		});

		userEvent.click(getByLabelText('Previous page'));
		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual(
			'translateX(-100%)'
		);
	});

	it('does not page right past end', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			props: {
				children: getEls(1),
			},
		});

		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual('translateX(-0%)');
	});

	it('displays pagination dots', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				perSlide: 3,
				children: getEls(7),
			},
		});

		expect(getByLabelText('Slider Pagination').childNodes).toHaveLength(3);
	});

	it('highlights active dot', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				children: getEls(7),
			},
		});

		expect(getByLabelText('Page 1')).toHaveClass('active');
	});

	it('calculates dot count dynamically', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				perSlide: 3,
				children: getEls(4),
			},
		});

		expect(getByLabelText('Slider Pagination').childNodes).toHaveLength(2);
	});

	it('defaults to one card per slide', async () => {
		const { getByLabelText } = await renderComponent({
			props: {
				children: getEls(4),
			},
		});

		expect(getByLabelText('Slider Pagination').childNodes).toHaveLength(4);
	});
});
