import React, { CSSProperties, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '@components/molecules/button';

import ArrowLeft from '../../../public/img/icon-arrow-left.svg';
import ArrowRight from '../../../public/img/icon-arrow-right.svg';

import styles from './slider.module.scss';

// TODO: improve children type
interface SliderProps {
	children: ReactNode;
	perSlide?: number;
	clip?: boolean;
}

export default function Slider({
	children,
	perSlide = 1,
	clip = true,
}: SliderProps): JSX.Element {
	const [delta, setDelta] = useState<number>(0);

	const array = React.Children.toArray(children);
	const pages = Math.ceil(array.length / perSlide);

	const pageLeft = () => setDelta(Math.max(0, delta - 1));
	const pageRight = () => setDelta(Math.min(pages - 1, delta + 1));

	const intl = useIntl();

	// TODO: Should the controls be made invisible to assistive technologies,
	//  since the content is not being technically hidden, only shifted horizontally?
	return (
		<div
			className={styles.slider}
			style={
				{
					'--perSlide': perSlide,
					overflow: clip ? 'hidden' : 'visible',
				} as CSSProperties
			}
		>
			<div
				data-testid={'card-window'}
				className={styles.slides}
				style={{
					transform: `translateX(-${delta * 100}%)`,
				}}
			>
				{children}
			</div>
			<div className={styles.controls}>
				<Button
					type="secondary"
					onClick={pageLeft}
					Icon={ArrowLeft}
					aria-label={intl.formatMessage({
						id: 'cardSlider__previousPageLabel',
						defaultMessage: 'Previous page',
						description: 'card slider previous page label',
					})}
					className={styles.buttonSquare}
				/>
				<ul
					aria-label={intl.formatMessage({
						id: 'cardSlider__paginationLabel',
						defaultMessage: 'Slider Pagination',
						description: 'card slider pagination label',
					})}
					className={styles.dots}
				>
					{Array.from(new Array(pages).keys()).map((i) => (
						<li
							key={i}
							className={`${styles.dot} ${i === delta && styles.active}`}
							aria-label={`Page ${i + 1}`}
						/>
					))}
				</ul>
				<Button
					type="secondary"
					onClick={pageRight}
					Icon={ArrowRight}
					aria-label={intl.formatMessage({
						id: 'cardSlider__nextPageLabel',
						defaultMessage: 'Next page',
						description: 'card slider next page label',
					})}
					className={styles.buttonSquare}
				/>
			</div>
		</div>
	);
}
