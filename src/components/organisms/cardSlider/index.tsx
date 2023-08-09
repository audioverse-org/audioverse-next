import dynamic from 'next/dynamic';
import React, { startTransition, useMemo, useState } from 'react';
import type Swiper from 'swiper';

import IconBack from '~public/img/icons/icon-back-light.svg';
import IconForward from '~public/img/icons/icon-forward-light.svg';

import styles from './index.module.scss';

type SliderProps = {
	onIndexChange?: (state: { index: number; total: number }) => void;
	items: JSX.Element[];
	previous: string;
	next: string;
	rows?: number;
	minCardWidth?: number;
};

export const MIN_CARD_WIDTH = 300;
export const GRID_GAP = 24;

const LazySwiper = dynamic(() => import('~lib/swiper'), {
	ssr: false,
});

const calculateItemsPerPage = (
	width: number,
	rows: number,
	minItemWidth: number
) => {
	const usableSpace = width - GRID_GAP;
	const minSpace = minItemWidth + GRID_GAP;
	const perRow = Math.max(Math.floor(usableSpace / minSpace), 1);
	const rowCount = perRow > 1 ? rows : 1;
	return perRow * rowCount;
};

const makeSlides = (
	items: JSX.Element[],
	rows: number,
	minItemWidth: number,
	width?: number
): JSX.Element[] => {
	if (!width) return [];

	const itemsPerPage = calculateItemsPerPage(width, rows, minItemWidth);

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
	minCardWidth = MIN_CARD_WIDTH,
}: SliderProps): JSX.Element {
	const [swiper, setSwiper] = useState<Swiper>();
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(true);
	const [width, setWidth] = useState<number>();

	const slides = useMemo(
		() => makeSlides(items, rows, minCardWidth, width),
		[items, rows, minCardWidth, width]
	);

	const handlers = useMemo(() => {
		return {
			init: (swiper: Swiper) => {
				setSwiper(swiper);
				setIsBeginning(swiper.isBeginning);
				setIsEnd(swiper.isEnd);
				setWidth(swiper.width);
			},
			update: (swiper: Swiper) => {
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
				'--min-card-width': `${minCardWidth}px`,
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
