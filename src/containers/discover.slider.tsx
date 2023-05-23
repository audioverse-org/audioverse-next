import dynamic from 'next/dynamic';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { HTMLSwiperElement, SwiperProps } from '~lib/swiper';
import useElementWidth from '~src/lib/hooks/useElementWidth';

import IconBack from '../../public/img/icons/icon-back-light.svg';
import IconForward from '../../public/img/icons/icon-forward-light.svg';
import styles from './discover.slider.module.scss';

type SliderProps = {
	onIndexChange?: (state: {
		indexStart: number;
		indexEnd: number;
		itemsPerPage: number;
	}) => void;
	items: JSX.Element[];
	previous: string;
	next: string;
	rows?: number;
};

export const MIN_CARD_WIDTH = 300;
export const GRID_GAP = 24;

const LazySwiperBase = dynamic(() => import('~lib/swiper'), {
	ssr: false,
});
const LazySwiper = forwardRef<HTMLSwiperElement, SwiperProps>(
	function LazySwiper({ ref: _, ...props }, ref) {
		return <LazySwiperBase {...props} forwardedRef={ref} />;
	}
);

export default function Slider({
	onIndexChange,
	items,
	previous,
	next,
	rows = 1,
}: SliderProps): JSX.Element {
	const [index, setIndex] = useState(0);
	const containerRef = useRef<HTMLSwiperElement>(null);
	const width = useElementWidth(containerRef.current);

	const itemsPerPage = useMemo(() => {
		const itemsPerRow = Math.max(
			Math.floor((width - GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)),
			1
		);
		return itemsPerRow > 1 ? itemsPerRow * rows : itemsPerRow;
	}, [rows, width]);

	const itemSets = useMemo(() => {
		return items.reduce<JSX.Element[][]>(
			(acc, item, i) => {
				const setIndex = Math.floor(i / itemsPerPage);
				acc[setIndex] = [...(acc[setIndex] || []), item];
				return acc;
			},
			[[]]
		);
	}, [items, itemsPerPage]);

	const hasNextPage = index + itemsPerPage < items.length;

	const navigate = (delta: number) => {
		setIndex((i) => {
			const indexStart = i + delta;
			const indexEnd = indexStart + itemsPerPage - 1;
			onIndexChange?.({
				indexStart,
				indexEnd,
				itemsPerPage,
			});
			return indexStart;
		});
	};

	return (
		<div className={styles.base}>
			<button
				className={styles.arrow}
				onClick={(e) => {
					e.preventDefault();
					containerRef.current?.swiper?.slidePrev();
					navigate(-itemsPerPage);
				}}
				disabled={index < 1}
				aria-label={previous}
			>
				<IconBack />
			</button>

			<LazySwiper
				data-testid="swiper"
				ref={containerRef}
				style={{
					'--min-card-width': `${MIN_CARD_WIDTH}px`,
				}}
			>
				{itemSets.map((itemSet, i) => (
					<swiper-slide data-testid="swiper-slide" key={i}>
						<div className={styles.page}>{itemSet}</div>
					</swiper-slide>
				))}
			</LazySwiper>

			<button
				className={styles.arrow}
				onClick={(e) => {
					e.preventDefault();
					containerRef.current?.swiper?.slideNext();
					navigate(itemsPerPage);
				}}
				disabled={!hasNextPage}
				aria-label={next}
			>
				<IconForward />
			</button>
		</div>
	);
}
