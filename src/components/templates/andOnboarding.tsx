import React, { ReactNode } from 'react';

import Heading2 from '@components/atoms/heading2';
import Slider from '@components/organisms/slider';

import LogoLarge from '../../../public/img/logo-large.svg';

import styles from './andOnboarding.module.scss';

export default function AndOnboarding({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		// TODO: finalize language, slides for onboarding
		<div className={styles.page}>
			<div className={styles.form}>
				<div className={styles.logo}>
					<LogoLarge />
				</div>
				<div className={styles.kicker}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
					imperdiet purus, sed sagittis dui.
				</div>
				{children}
			</div>
			<div className={styles.promos}>
				<Slider dark grow>
					<div className={styles.slide}>
						<div className={styles.cards} />
						<div className={styles.description}>
							<Heading2 className={styles.heading}>
								Audioverse has different kinds of content
							</Heading2>
							<p>
								You’ll see content like sermons, songs, even audiobooks. Some
								are stand-alone while others are a part of a series.
							</p>
						</div>
					</div>
					<div />
					<div />
				</Slider>
			</div>
		</div>
	);
}
