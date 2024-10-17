import dynamic from 'next/dynamic';
import React, { startTransition, useMemo, useState } from 'react';
import type Swiper from 'swiper';

import IconBack from '~public/img/icons/icon-back-light.svg';
import IconForward from '~public/img/icons/icon-forward-light.svg';

import { calculateItemsPerPage, MIN_CARD_WIDTH } from './index.helpers';
import styles from './index.module.scss';

type SliderProps = {
	onIndexChange?: (state: { index: number; total: number }) => void;
	items: JSX.Element[];
	previous: string;
	next: string;
	rows?: number;
	isDarkBg?: boolean;
	hasBg?: boolean;
	minCardWidth?: number;
};

const LazySwiper = dynamic(() => import('~lib/swiper'), {
	ssr: false,
});

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
	isDarkBg,
	hasBg,
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
				<IconBack color={isDarkBg && '#fff'} />
			</button>

			<LazySwiper on={handlers} className={hasBg ? styles.whiteBg : ''}>
				{slides}
			</LazySwiper>

			<button
				className={styles.arrow}
				onClick={() => swiper?.slideNext()}
				disabled={isEnd}
				aria-label={next}
			>
				<IconForward color={isDarkBg && '#fff'} />
			</button>
		</div>
	);
}
