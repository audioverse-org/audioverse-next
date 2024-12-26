import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { __eventHandlers, __runHandlers, __swiper } from '~lib/swiper';
import useElementWidth from '~src/lib/hooks/useElementWidth';
import { buildRenderer } from '~src/lib/test/buildRenderer';

import Slider from '.';
import { GRID_GAP, MIN_CARD_WIDTH } from './index.helpers';

jest.mock('~lib/hooks/useElementWidth');

const defaultProps: {
	previous: string;
	next: string;
	items: JSX.Element[];
	rows?: number;
	onIndexChange?: (state: { index: number; total: number }) => void;
} = {
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
	__swiper.width = w;
	return w;
};

const getSlides = () => {
	const container = screen.getByTestId('swiper');

	return within(container).getAllByTestId('swiper-slide');
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

		expect(await screen.findByText('1')).toBeInTheDocument();
		expect(await screen.findByText('2')).toBeInTheDocument();
	});

	it('displays one item per page on mobile', async () => {
		mockWidth(1);

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		const slides = getSlides();

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
		const items = [<div key="1">1</div>, <div key="2">2</div>];

		__swiper.isEnd = false;
		__swiper.realIndex = 1;
		__swiper.slides = items as any;

		const onIndexChange = jest.fn();

		await renderComponent({
			props: {
				...defaultProps,
				items,
				onIndexChange,
			},
		});

		__runHandlers('transitionEnd', __swiper);

		expect(onIndexChange).toHaveBeenCalledWith({
			index: 1,
			total: 2,
		});
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

		await userEvent.click(screen.getByLabelText('next'));
		await userEvent.click(screen.getByLabelText('previous'));

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

		const slides = getSlides();

		expect(slides).toHaveLength(1);
	});

	it('ignores rows if there is only space for one column', async () => {
		mockWidth(1);

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
				rows: 2,
			},
		});

		const slides = getSlides();

		expect(slides).toHaveLength(2);
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

		const slides = getSlides();

		expect(slides).toHaveLength(1);
	});

	it('takes grid gap into account', async () => {
		__swiper.width = 2 * MIN_CARD_WIDTH + GRID_GAP - 1;

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		const slides = getSlides();

		expect(slides).toHaveLength(2);
	});

	it('uses swiper to page forward', async () => {
		__swiper.isEnd = false;

		await renderComponent({
			props: {
				...defaultProps,
				items: [<div key="1">1</div>, <div key="2">2</div>],
			},
		});

		await waitFor(() => {
			expect(screen.getByLabelText('next')).toBeEnabled();
		});

		await userEvent.click(screen.getByLabelText('next'));

		await waitFor(() => {
			expect(__swiper.slideNext).toBeCalled();
		});
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

		await userEvent.click(screen.getByLabelText('previous'));

		await waitFor(() => {
			expect(__swiper.slidePrev).toBeCalled();
		});
	});
});
