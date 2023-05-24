import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SwiperEvents } from 'swiper/types';

import Slider, { GRID_GAP, MIN_CARD_WIDTH } from '~containers/discover.slider';
import { __eventHandlers, __runHandlers, __swiper } from '~lib/swiper';
import useElementWidth from '~src/lib/hooks/useElementWidth';
import { buildRenderer } from '~src/lib/test/buildRenderer';

jest.mock('~lib/hooks/useElementWidth');

const defaultProps = {
	previous: 'previous',
	next: 'next',
	items: [],
};

const renderComponent = buildRenderer(Slider, {
	defaultProps,
});

export const mockWidth = (cardsPerPage: number) => {
	const w = cardsPerPage * MIN_CARD_WIDTH + (cardsPerPage + 1) * GRID_GAP;
	jest.mocked(useElementWidth).mockReturnValue(w);
	return w;
};

describe('Slider', () => {
	beforeEach(() => {
		mockWidth(1);
	});

	it('renders items', async () => {
		await renderComponent({
			props: {
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	it('displays one item per page on mobile', async () => {
		mockWidth(1);

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		const container = screen.getByTestId('swiper');
		const slides = within(container).getAllByTestId('swiper-slide');

		expect(slides).toHaveLength(2);
	});

	it('displays two items per page', async () => {
		mockWidth(2);

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		expect(screen.getByLabelText('next')).toBeDisabled();
	});

	it('calls onIndexChange', async () => {
		const onIndexChange = jest.fn();

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
				onIndexChange,
			},
		});

		userEvent.click(screen.getByLabelText('next'));

		expect(onIndexChange).toHaveBeenCalledWith({
			indexStart: 1,
			indexEnd: 1,
			itemsPerPage: 1,
		});
	});

	it('pages forward by two cards', async () => {
		mockWidth(2);

		await renderComponent({
			props: {
				...defaultProps,
				items: [
					<div key="1">1</div>,
					<div key="2">2</div>,
					<div key="3">3</div>,
					<div key="4">4</div>,
				],
			},
		});

		userEvent.click(screen.getByLabelText('next'));

		expect(screen.getByLabelText('next')).toBeDisabled();
	});

	it('pages back by two cards', async () => {
		mockWidth(2);

		await renderComponent({
			props: {
				...defaultProps,
				items: [
					<div key="1">1</div>,
					<div key="2">2</div>,
					<div key="3">3</div>,
					<div key="4">4</div>,
				],
			},
		});

		userEvent.click(screen.getByLabelText('next'));
		userEvent.click(screen.getByLabelText('previous'));

		expect(screen.getByLabelText('previous')).toBeDisabled();
	});

	it('supports multiple rows', async () => {
		mockWidth(2);

		await renderComponent({
			props: {
				...defaultProps,
				items: [
					<div key="1">1</div>,
					<div key="2">2</div>,
					<div key="3">3</div>,
					<div key="4">4</div>,
				],
				rows: 2,
			},
		});

		expect(screen.getByLabelText('next')).toBeDisabled();
	});

	it('ignores rows if there is only space for one column', async () => {
		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
				rows: 2,
			},
		});

		expect(screen.getByLabelText('next')).toBeEnabled();
	});

	it('fits six items on a single page', async () => {
		mockWidth(3);

		await renderComponent({
			props: {
				...defaultProps,
				items: [
					<div key="1">1</div>,
					<div key="2">2</div>,
					<div key="3">3</div>,
					<div key="4">4</div>,
					<div key="5">5</div>,
					<div key="6">6</div>,
				],
				rows: 2,
			},
		});

		expect(screen.getByLabelText('next')).toBeDisabled();
	});

	it('takes grid gap into account', async () => {
		jest.mocked(useElementWidth).mockReturnValue(642);

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		expect(screen.getByLabelText('next')).toBeEnabled();
	});

	it.only('uses swiper to page forward', async () => {
		__swiper.isEnd = false;

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		await screen.findByText('1');

		__runHandlers('afterInit');

		await waitFor(() => {
			expect(screen.getByLabelText('next')).toBeEnabled();
		});

		userEvent.click(screen.getByLabelText('next'));

		expect(__swiper.slideNext).toBeCalled();
	});

	it('uses swiper to page back', async () => {
		__swiper.isBeginning = false;

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		await screen.findByText('1');

		userEvent.click(screen.getByLabelText('previous'));

		expect(__swiper.slidePrev).toBeCalled();
	});
});
