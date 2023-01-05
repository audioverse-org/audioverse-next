import clsx from 'clsx';
import React, { CSSProperties, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '@/components/molecules/button';

import ArrowLeft from '../../../public/img/icons/icon-back-light.svg';
import ArrowRight from '../../../public/img/icons/icon-forward-light.svg';

import styles from './slider.module.scss';

interface SliderProps {
	children: ReactNode;
	perSlide?: number;
	clip?: boolean;
	dark?: boolean;
	grow?: boolean;
	floatingControls?: boolean;
	responsiveOnMobile?: boolean;
}

export default function Slider({
	children,
	perSlide = 1,
	clip = true,
	dark,
	grow,
	floatingControls,
	responsiveOnMobile,
}: SliderProps): JSX.Element {
	const intl = useIntl();
	const [delta, setDelta] = useState<number>(0);

	if (floatingControls && React.Children.count(children) > 5) {
		throw new Error('Unsupported number of children');
	}

	const array = React.Children.toArray(children);
	const pages = Math.ceil(array.length / perSlide);

	const pageLeft = () => setDelta(Math.max(0, delta - 1));
	const pageRight = () => setDelta(Math.min(pages - 1, delta + 1));

	const buttonType = dark ? 'secondaryInverse' : 'secondary';

	// TODO: Should the controls be made invisible to assistive technologies,
	//  since the content is not being technically hidden, only shifted horizontally?
	return (
		<div
			className={clsx(
				styles.slider,
				dark && styles.dark,
				grow && styles.grow,
				floatingControls && styles.floatingControls,
				responsiveOnMobile && styles.responsiveOnMobile,
				styles[`slideActive${delta}`]
			)}
			data-testid="slider"
			style={
				{
					'--perSlide': perSlide,
					'--activeSlide': delta,
					overflow: clip ? 'hidden' : 'visible',
				} as CSSProperties
			}
		>
			<div className={styles.slides}>{children}</div>
			<div className={styles.controls}>
				<Button
					type={buttonType}
					onClick={pageLeft}
					IconLeft={ArrowLeft}
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
							onClick={() => setDelta(i)}
							aria-label={intl.formatMessage(
								{
									id: 'cardSlider__pageNumberLabel',
									defaultMessage: 'Page {number}',
								},
								{
									number: i + 1,
								}
							)}
							aria-current={i === delta}
						/>
					))}
				</ul>
				<Button
					type={buttonType}
					onClick={pageRight}
					IconLeft={ArrowRight}
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
