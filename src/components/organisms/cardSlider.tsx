import React, { ReactNode, useState } from 'react';

import ArrowLeft from '../../../public/img/icon-arrow-left.svg';
import ArrowRight from '../../../public/img/icon-arrow-right.svg';

import styles from './cardSlider.module.scss';

// TODO: improve children type
interface CardSliderProps {
	children: ReactNode;
}

export default function CardSlider({ children }: CardSliderProps): JSX.Element {
	const [delta, setDelta] = useState<number>(0);

	const array = React.Children.toArray(children);
	const pages = Math.ceil(array.length / 3);

	const pageLeft = () => setDelta(Math.max(0, delta - 1));
	const pageRight = () => setDelta(Math.min(pages - 1, delta + 1));

	// TODO: Should the controls be made invisible to assistive technologies,
	//  since the content is not being technically hidden, only shifted horizontally?
	return (
		<div className={styles.slider}>
			<div
				data-testid={'card-window'}
				className={styles.cards}
				style={{
					transform: `translateX(-${delta * 100}%)`,
				}}
			>
				{children}
			</div>
			<div className={styles.controls}>
				<button
					aria-label={'Previous page'}
					onClick={pageLeft}
					className={styles.button}
				>
					<ArrowLeft />
				</button>
				<ul aria-label={'Slider Pagination'} className={styles.dots}>
					{Array.from(new Array(pages).keys()).map((i) => (
						<li
							key={i}
							className={`${styles.dot} ${i === delta && styles.active}`}
							aria-label={`Page ${i + 1}`}
						/>
					))}
				</ul>
				<button
					aria-label={'Next page'}
					onClick={pageRight}
					className={styles.button}
				>
					<ArrowRight />
				</button>
			</div>
		</div>
	);
}
