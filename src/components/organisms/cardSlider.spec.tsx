import userEvent from '@testing-library/user-event';
import React from 'react';

import CardRecording from '@components/molecules/cardRecording';
import CardSlider from '@components/organisms/cardSlider';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(CardSlider);

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
			children: (
				<CardRecording
					recording={
						{
							title: 'the_recording_title',
						} as any
					}
				/>
			),
		});

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('pages right', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			children: getEls(7),
		});

		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual(
			'translateX(-100%)'
		);
	});

	it('tracks page position', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			children: getEls(7),
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
			children: getEls(7),
		});

		userEvent.click(getByLabelText('Next page'));
		userEvent.click(getByLabelText('Previous page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual('translateX(-0%)');
	});

	it('does not page left past start', async () => {
		const { getByLabelText, getByTestId } = await renderComponent({
			children: getEls(7),
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
			children: getEls(1),
		});

		userEvent.click(getByLabelText('Next page'));

		const pane = getByTestId('card-window');

		expect(pane.style.getPropertyValue('transform')).toEqual('translateX(-0%)');
	});

	it('displays pagination dots', async () => {
		const { getByLabelText } = await renderComponent({
			children: getEls(7),
		});

		expect(getByLabelText('Slider Pagination').childNodes).toHaveLength(3);
	});

	it('highlights active dot', async () => {
		const { getByLabelText } = await renderComponent({
			children: getEls(7),
		});

		expect(getByLabelText('Page 1')).toHaveClass('active');
	});

	it('calculates dot count dynamically', async () => {
		const { getByLabelText } = await renderComponent({
			children: getEls(4),
		});

		expect(getByLabelText('Slider Pagination').childNodes).toHaveLength(2);
	});
});
