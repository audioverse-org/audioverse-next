import dynamic from 'next/dynamic';
import React, { startTransition, useMemo, useState } from 'react';
import Swiper from 'swiper';

import IconBack from '~public/img/icons/icon-back-light.svg';
import IconForward from '~public/img/icons/icon-forward-light.svg';

import styles from './index.slider.module.scss';

type SliderProps = {
	onIndexChange?: (state: { index: number; total: number }) => void;
	items: JSX.Element[];
	previous: string;
	next: string;
	rows?: number;
};

export const MIN_CARD_WIDTH = 300;
export const GRID_GAP = 24;

const LazySwiper = dynamic(() => import('~lib/swiper'), {
	ssr: false,
});

const calculateItemsPerPage = (width: number, rows: number) => {
	const cardsPerRow = Math.max(
		Math.floor((width - GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)),
		1
	);
	return cardsPerRow * (cardsPerRow > 1 ? rows : 1);
};

const makeSlides = (
	items: JSX.Element[],
	rows: number,
	width?: number
): JSX.Element[] => {
	if (!width) return [];

	const itemsPerPage = calculateItemsPerPage(width, rows);

	const itemSets = items.reduce<JSX.Element[][]>(
		(acc, item, i) => {
			const setIndex = Math.floor(i / itemsPerPage);
			acc[setIndex] = [...(acc[setIndex] || []), item];
			return acc;
		},
		[[]]
	);

	return itemSets.map((itemSet, i) => (
		<swiper-slide className={styles.page} data-testid="swiper-slide" key={i}>
			{itemSet}
		</swiper-slide>
	));
};

export default function Slider({
	onIndexChange,
	items,
	previous,
	next,
	rows = 1,
}: SliderProps): JSX.Element {
	const [swiper, setSwiper] = useState<Swiper>();
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(true);
	const [width, setWidth] = useState<number>();

	const slides = useMemo(
		() => makeSlides(items, rows, width),
		[items, rows, width]
	);

	const handlers = useMemo(() => {
		return {
			init: (swiper: Swiper) => {
				setSwiper(swiper);
				setIsBeginning(swiper.isBeginning);
				setIsEnd(swiper.isEnd);
				setWidth(swiper.width);
			},
			transitionEnd: (swiper: Swiper) => {
				setIsBeginning(swiper.isBeginning);
				setIsEnd(swiper.isEnd);
				startTransition(() =>
					onIndexChange?.({
						index: swiper.realIndex,
						total: swiper.slides.length,
					})
				);
			},
			slidesLengthChange: (swiper: Swiper) => {
				setIsBeginning(swiper.isBeginning);
				setIsEnd(swiper.isEnd);
				startTransition(() =>
					onIndexChange?.({
						index: swiper.realIndex,
						total: swiper.slides.length,
					})
				);
			},
			resize: (swiper: Swiper) => {
				setWidth(swiper.width);
			},
		};
	}, [onIndexChange]);

	return (
		<div
			className={styles.base}
			style={{
				'--min-card-width': `${MIN_CARD_WIDTH}px`,
			}}
		>
			<button
				className={styles.arrow}
				onClick={() => swiper?.slidePrev()}
				disabled={isBeginning}
				aria-label={previous}
			>
				<IconBack />
			</button>

			<LazySwiper on={handlers}>{slides}</LazySwiper>

			<button
				className={styles.arrow}
				onClick={() => swiper?.slideNext()}
				disabled={isEnd}
				aria-label={next}
			>
				<IconForward />
			</button>
		</div>
	);
}
